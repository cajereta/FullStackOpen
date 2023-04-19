const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  const order = blogs.sort(function (a, b) {
    return b.likes - a.likes;
  });
  const { title, author, likes } = order[0];
  return {
    title,
    author,
    likes
  };
};

const mostBlogs = (list) => {
  const count = list.reduce((prev, curr) => (prev[curr["author"]] = ++prev[curr["author"]] || 1, prev), {});
  const [author, blogs] = Object.entries(count).reduce((max, entry) => entry[1] >= max[1] ? entry : max, [0, -Infinity]);
  return {
    author,
    blogs
  };
};

const mostLikes = (list) => {
  const values = Object.values(
    list.reduce((acc, { author, likes }) => {
      acc[author] = author in acc
        ? { author, likes: acc[author].likes + likes }
        : { author, likes: likes };
      return acc;
    }, {}));
  const result = values.sort(function (a, b) {
    return b.likes - a.likes;
  });
  return result[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};