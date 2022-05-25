// TODO 4.5-4.7

const dummy = (blogs) => {
  return 1
}

const getLikes = (blogs) => {
  return blogs.reduce((acc, el) => acc += el.likes, 0)
}
module.exports = {dummy, getLikes}