const getLikes = require('../utils/list_helper').getLikes

describe('Summary blogs likes', () => {
  test('empty blogs', () => {
    const blogs = []
    expect(getLikes(blogs)).toBe(0)
  })
  test('one blog', () => {
    const blogs = [{
      name: 'First',
      likes: 5
    }]
    expect(getLikes(blogs)).toBe(5)
  })
  test('two+ blog', () => {
    const blogs = [{
      name: 'First',
      likes: 5
    },
      {
        name: 'Second',
        likes: 7
      }]
    expect(getLikes(blogs)).toBe(12)
  })
})