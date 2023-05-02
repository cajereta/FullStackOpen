const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});


blogsRouter.post('/', async (request, response) => {
  // const body = request.body;
  // // const decodedToken = jwt.verify(request.token, process.env.SECRET);
  // // if (!decodedToken.id) {
  // //   return response.status(401).json({ error: "token invalid" });
  // // }
  // // console.log(decodedToken);
  // // const user = await User.findById(decodedToken.id);
  // const user = request.user;

  // const blog = new Blog({
  //   title: body.title,
  //   author: body.author,
  //   url: body.url,
  //   likes: body.likes || 0,
  //   user: user._id
  // });

  // const savedBlog = await blog.save();
  // user.blogs = user.blogs.concat(savedBlog._id);
  // await user.save();

  // response.status(201).json(savedBlog);
  const { title, author, url, likes } = request.body;
  const blog = new Blog({
    title, author, url,
    likes: likes ? likes : 0
  });

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' });
  }

  blog.user = user._id;

  let createdBlog = await blog.save();

  user.blogs = user.blogs.concat(createdBlog._id);
  await user.save();

  createdBlog = await Blog.findById(createdBlog._id).populate('user');

  response.status(201).json(createdBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  // const decodedToken = jwt.verify(request.token, process.env.SECRET);
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: "token invalid" });
  // }
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === user._id.toString()) {
    await blog.remove();
    response.status(204).end();
  } else {
    response.status(401).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, url, author, likes } = request.body;

  let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, url, author, likes }, { new: true });

  updatedBlog = await Blog.findById(updatedBlog._id).populate('user');

  response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const comments = [...blog.comments, request.body.comment];
  let commentedBlog = await Blog.findByIdAndUpdate(request.params.id, { comments: comments }, { new: true });
  response.json(commentedBlog);
});

module.exports = blogsRouter;