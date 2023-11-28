const Book = require('../../../models/Book')
const db = require('../../../database/connect')

describe('Book', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('getAll', () => {
    it('resolves with books on succesful', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{ name: 'b1', author: 'a1' }, { name: 'b2', author: 'a2' }, { name: 'b3', author: 'a3' }]
        })

      const books = await Book.getAll()
      expect(books).toHaveLength(3)
      expect(books[0]).toHaveProperty('id')
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: []
        })

      try {
        await Book.getAll()
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe('No books available!')
      }
    })

    describe('getOneByBookName', () => {
        it('resolves with a single book when found', async () => {
          const testBook = { book_id: 1, title: 'testTitle', author: 'testAuthor', blurb: 'testBlurb', stock: 10, coverimageurl: 'testUrl' };
      
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [testBook] });
      
          const book = await Book.getOneByBookName('testTitle');
          expect(book).toEqual(expect.any(Book));
          expect(book.title).toBe('testTitle');
        });
      
        it('throws an error when more than one book of the same name exists', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{}, {}] }); // Mocking two books with the same name
      
          await expect(Book.getOneByBookName('duplicateBook')).rejects.toThrow('More than one book of same name!');
        });
      
        it('throws an error when the book is not found', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] });
      
          await expect(Book.getOneByBookName('nonExistentBook')).rejects.toThrow('Unable to find book!');
        });
      });
    
      describe('get')
    
  })


})
