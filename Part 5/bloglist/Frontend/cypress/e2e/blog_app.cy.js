describe("Blog app", function () {
  //   beforeEach(function () {
  //     cy.visit("http://localhost:3000");
  //   });
  //   it("front page can be opened", function () {
  //     cy.contains("Made by cajereta");
  //   });

  //   it("User can log in", function () {
  //     cy.contains("Log in").click();
  //     cy.get("#username").type("user");
  //     cy.get("#password").type("123456");
  //     cy.get("#login-button").click();

  //     cy.contains("UserNormal logged in");
  //   });

  //   it("Login fails with wrong password", function () {
  //     cy.contains("Log in").click();
  //     cy.get("#username").type("user");
  //     cy.get("#password").type("12345");
  //     cy.get("#login-button").click();

  //     cy.contains("Wrong credentials");

  //   });
  // });
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "maestruli",
      name: "Emanuelsson Lukettini",
      password: "123456"
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("user can be created", function () {
    cy.contains("Made by cajereta");
  });

  it("User can log in", function () {
    cy.contains("Log in").click();
    cy.get("#username").type("maestruli");
    cy.get("#password").type("123456");
    cy.get("#login-button").click();

    cy.contains("Emanuelsson Lukettini logged in");

  });

  it("Fails with wrong credentials", function () {
    cy.contains("Log in").click();
    cy.get("#username").type("maestrul");
    cy.get("#password").type("12345");
    cy.get("#login-button").click();

    cy.contains("Wrong credentials");

  });
});

describe("Being logged the user can create a blog", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "maestruli",
      name: "Emanuelsson Lukettini",
      password: "123456"
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
    cy.contains("Log in").click();
    cy.get("#username").type("maestruli");
    cy.get("#password").type("123456");
    cy.get("#login-button").click();
  });

  it("User can create blog", function () {
    cy.contains("Add a new blog!").click();
    cy.get("#title-blog").type("A new blog for testing!");
    cy.get("#author-blog").type("The one and only");
    cy.get("#url-blog").type("https://www.youtube.com/watch?v=_P9zR5KaPsc");
    cy.get("#likes-blog").type("123");
    cy.get("#submit-blog").click();
    cy.contains("A new blog for testing!");
  });
});

describe("With a blog created, perform actions on said blog", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "maestruli",
      name: "Emanuelsson Lukettini",
      password: "123456"
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
    cy.contains("Log in").click();
    cy.get("#username").type("maestruli");
    cy.get("#password").type("123456");
    cy.get("#login-button").click();
    cy.contains("Add a new blog!").click();
    cy.get("#title-blog").type("A new blog for testing!");
    cy.get("#author-blog").type("The one and only");
    cy.get("#url-blog").type("https://www.youtube.com/watch?v=_P9zR5KaPsc");
    cy.get("#likes-blog").type("123");
    cy.get("#submit-blog").click();
    cy.contains("A new blog for testing!");
  });

  it("User can like a post ", function () {
    cy.contains("Show details").click();
    cy.contains("Like").click();
    cy.contains("Likes: 124");
  });

  it("User that created a blog can delete it", function () {
    cy.contains("Show details").click();
    cy.contains("Delete").click();
    cy.contains("A new blog for testing!").should("not.exist");
  });

  it("Create new user and try to delete post created by someone else", function () {
    cy.contains("Logout").click();
    const newUser = {
      username: "deleter",
      name: "Lukketi",
      password: "112233"
    };
    cy.request("POST", "http://localhost:3003/api/users/", newUser);
    cy.visit("http://localhost:3000");
    cy.contains("Log in").click();
    cy.get("#username").type("deleter");
    cy.get("#password").type("112233");
    cy.get("#login-button").click();
    cy.contains("Show details").click();
    cy.contains("Delete").should("not.exist");
  });
});

describe("Blogs are ordered according to likes", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "maestruli",
      name: "Emanuelsson Lukettini",
      password: "123456"
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
    cy.contains("Log in").click();
    cy.get("#username").type("maestruli");
    cy.get("#password").type("123456");
    cy.get("#login-button").click();
    cy.contains("Add a new blog!").click();
    cy.get("#title-blog").type("A new blog for testing!");
    cy.get("#author-blog").type("The one and only");
    cy.get("#url-blog").type("https://www.youtube.com/watch?v=_P9zR5KaPsc");
    cy.get("#likes-blog").type("5");
    cy.get("#submit-blog").click();

    cy.contains("Add a new blog!").click();
    cy.contains("A new blog for testing!");
    cy.get("#title-blog").type("Gotta be last at first");
    cy.get("#author-blog").type("The one");
    cy.get("#url-blog").type("https://www.youtube.com/watch?v=_P9zR5KaPsc");
    cy.get("#likes-blog").type("4");
    cy.get("#submit-blog").click();
    cy.contains("A new blog for testing!");
  });

  it("Order of blogs must change", function () {
    cy.contains("Add a new blog!").click();
    cy.get("#title-blog").type("Gotta be first");
    cy.get("#author-blog").type("The one and only");
    cy.get("#url-blog").type("https://www.youtube.com/watch?v=_P9zR5KaPsc");
    cy.get("#likes-blog").type("15");
    cy.get("#submit-blog").click();

    cy.get(".blog").eq(2).contains("Show details").click();
    cy.contains("Like").click();

    //Check order
    cy.get(".blog").eq(0).should("contain", "Gotta be first");
    cy.get(".blog").eq(2).should("contain", "Gotta be last at first");

    cy.get(".blog").eq(2).contains("Like").click();


    cy.get(".blog").eq(0).should("contain", "Gotta be first");
    cy.get(".blog").eq(1).should("contain", "Gotta be last at first");

  });
});
