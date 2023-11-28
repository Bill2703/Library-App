const booksController = require('../../../controllers/books')
const Book = require('../../../models/Book')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('books controller', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('index', () => {
    it('should return books with a status code 200', async () => {
      const testBooks = ['b1', 'b2']

      jest.spyOn(Book, 'getAll')
        .mockResolvedValue(testBooks)

      await booksController.index(null, mockRes)


      expect(Book.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith(testBooks)
    })

    it('sends an error upon fail', async () => {
      jest.spyOn(Book, 'getAll')
        .mockRejectedValue(new Error('Something happened to your db'))


      await booksController.index(null, mockRes)

      expect(Book.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Something happened to your db' })
    })
  })
})

