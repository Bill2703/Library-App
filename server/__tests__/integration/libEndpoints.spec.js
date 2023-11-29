require('dotenv').config();
const request = require('supertest')
const app = require('../../api')

describe('api server', () => {
  let api;

  beforeAll(() => {
    api = app.listen(4000, () => {
      console.log('Test server running on port 4000')
    })
  })

  afterAll((done) => {
    console.log('Stopping test server')
    api.close(done)
  })

  test('responds to GET / with status 200', (done) => {
    request(api).get('/').expect(200, done)
  })

  it('responds to GET / with a message and a description', async () => {
    const response = await request(api).get('/')

    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe('Library App')
    expect(response.body.teamName).toBe('On the same page')
  })

  test('responds to GET /books with status 200', (done) => {
    request(api).get('/books').expect(200, done)
  }) 

  test('responds to GET /books/To Kill a Mockingbird with status 200', (done) => {
    request(api).get('/books/To Kill a Mockingbird').expect(200, done)
  }) 

})
