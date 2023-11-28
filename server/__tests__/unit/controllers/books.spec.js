const booksController = require('../../../controllers/books')
const Book = require('../../../models/Book')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
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

  describe('show', () => {
    it('should return a book with a status code 200', async () => {
      const testBook = new Book({ book_id: 1, title: 'b1', author: 'a1', blurb: 'b1', stock: 10, coverimageurl: 'url' });
      jest.spyOn(Book, 'getOneByBookName')
        .mockResolvedValue(testBook);
    
      const mockReq = { params: { name: 'b1' } };
      await booksController.show(mockReq, mockRes);
    
      expect(Book.getOneByBookName).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testBook);
    });
    

    it('sends an error upon fail', async () => {
      jest.spyOn(Book, 'getOneByBookName')
        .mockRejectedValue(new Error('Not found'));
    
      const mockReq = { params: { name: 'cantFind' } };
      await booksController.show(mockReq, mockRes);
    
      expect(Book.getOneByBookName).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Not found' });
    });
    
  })

    describe('create', () => {
      it('Should return a new created book with status code 201', async () => {
        const newBookData = ({ book_id: 1, title: 'b1', author: 'a1', blurb: 'b1', stock: 10, coverimageurl: 'url' })
        jest.spyOn(Book, 'create').mockResolvedValue(newBookData);

        const mockReq = { params: {newBookData} };
        await booksController.create(mockReq, mockRes);

        expect(Book.create).toHaveBeenCalledTimes(1);
        expect(mockStatus).toHaveBeenCalledWith(201);
        expect(mockJson).toHaveBeenCalledWith(newBookData);
      })


      it('sends an error upon fail', async () => {
        jest.spyOn(Book, 'create')
          .mockRejectedValue(new Error('Bad request'));
      
        const mockReq = { params: { name: 'b1' } };
        await booksController.create(mockReq, mockRes);
      
        expect(Book.create).toHaveBeenCalledTimes(1);
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({ error: 'Bad request' });
      });

      
    })
    
})

