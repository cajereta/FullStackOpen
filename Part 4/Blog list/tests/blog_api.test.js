const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");

const beforeSome = async () => {
  const response = await api
    .post("/api/login")
    .send({ username: "root", password: "secret" });

  const authorization = `Bearer ${response._body.token}`;

  const usersAtStart = await helper.usersInDb();

  const newBlog = {
    title: "AsyncAwait Test",
    author: "Larry the King",
    url: "https://Larrypatterns.com/",
    user: usersAtStart[0].id
  };

  await api
    .post("/api/blogs")
    .set("Authorization", authorization)
    .send(newBlog)
    .expect(201);

  return { authorization, newBlog };
};


beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();

});


describe("Blogs as JSON", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("All blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});


describe("Unique identifier id", () => {
  test("Identifier id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach(element => {
      expect(element.id).toBeDefined();
    });
  });
});

describe("Create a new blog", () => {
  test("Creating a new post", async () => {
    const usersAtStart = await helper.usersInDb();

    const response = await api
      .post("/api/login")
      .send({ username: "root", password: "secret" });

    const authorization = `Bearer ${response._body.token}`;

    const newBlog = {
      title: "AsyncAwait Test",
      author: "Larry the King",
      url: "https://Larrypatterns.com/",
      likes: 69,
      user: usersAtStart[0].id
    };

    await api
      .post("/api/blogs")
      .set("Authorization", authorization)
      .send(newBlog)
      .expect(201);

    const blogsAtEnd = await helper.blogsInBD();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });
});

describe("Blog defaults to 0 likes if property missing", () => {
  test("Creating a new post with 0 likes", async () => {
    const { authorization, newBlog } = await beforeSome();

    await api
      .post("/api/blogs")
      .set("Authorization", authorization)
      .send(newBlog)
      .expect(201);

    const blogsAtEnd = await helper.blogsInBD();
    expect(blogsAtEnd[2].likes).toBe(0);
  });
});

describe("Post created without author or url properties does not get added, status code 400", () => {
  test("Required properties are missing", async () => {
    const { authorization } = await beforeSome();
    const blogsAtStart = await helper.blogsInBD();
    const newBlog = {
      author: "Larry the King",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", authorization)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInBD();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  }, 10000);
});

describe("Delete a blog", () => {
  test("succeds with status code 204 if id is valid", async () => {

    const { authorization } = await beforeSome();
    const blogsAtStart = await helper.blogsInBD();
    const blogToDelete = blogsAtStart[2];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", authorization)
      .expect(204);

    const blogsAtEnd = await helper.blogsInBD();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const contents = blogsAtEnd.map(r => r.title);
    expect(contents).not.toContain(blogToDelete.title);

  });
});

describe("Update a blog", () => {
  test("succeds with a status code 200", async () => {
    const blogsAtStart = await helper.blogsInBD();
    const blogToUpdate = blogsAtStart[0];

    const blogContent = {
      likes: 69
    };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogContent)
      .expect(200);

    const blogsAtEnd = await helper.blogsInBD();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const contents = blogsAtEnd.map(r => r.likes);
    expect(contents).toContain(blogContent.likes);

  });
});

describe("Add new test without token gives 401 error ", () => {
  test("Add blog fails ", async () => {
    const { newBlog } = await beforeSome();

    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY0MzY0NzUwM2U3ZmQ1YzBiZDJlMTQ0YyIsImlhdCI6MTY4MTI3ODg4N30.hx13xd3lPk8Kb9mxJ0tR_DJ6u1a6iamoN8up1XSVS49")
      .send(newBlog)
      .expect(401);
  });
});






afterAll(async () => {
  await mongoose.connection.close();
});
