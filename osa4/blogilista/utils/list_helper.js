const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const mostlikes = Math.max(...likes)
  const favorite = blogs.find(blog => blog.likes === mostlikes)
  return blogs.length === 0
    ? null
    : {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}