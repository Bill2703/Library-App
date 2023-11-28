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
            .mockResolvedValueOnce({ rows: [{}, {}] }); 
      
          await expect(Book.getOneByBookName('duplicateBook')).rejects.toThrow('More than one book of same name!');
        });
      
        it('throws an error when the book is not found', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] });
      
          await expect(Book.getOneByBookName('nonExistentBook')).rejects.toThrow('Unable to find book!');
        });
      });

      describe('create', () => {
        it('successfully creates a new book', async () => {
          const newBookData = { title: 'newBook', author: 'newAuthor', blurb: 'newBlurb', stock: 5, coverimageurl: 'newUrl' };
          const newBookRow = {
            book_id: 1, 
            title: 'newBook', 
            author: 'newAuthor', 
            blurb: 'newBlurb', 
            stock: 5, 
            coverimageurl: 'newUrl'
          };
      
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] }) 
            .mockResolvedValueOnce({ rows: [{ title: 'newBook' }] }) 
            .mockResolvedValueOnce({ rows: [newBookRow] }); 
      
          const book = await Book.create(newBookData);
          expect(book).toEqual(expect.any(Book));
          expect(book.title).toBe('newBook');
        });
        it('throws an error when a book with the same title already exists', async () => {
            jest.spyOn(db, 'query')
              .mockResolvedValueOnce({ rows: [{ title: 'existingBook' }] }); 
        
            const newBookData = { title: 'existingBook', author: 'newAuthor', blurb: 'newBlurb', stock: 5, coverimageurl: 'newUrl' };
            await expect(Book.create(newBookData)).rejects.toThrow("A book with the title 'existingBook' already exists.");
          });
      });
    });

      describe('destroy', () => {
        it('successfully deletes a book', async () => {
          const book = new Book({ book_id: 1, title: 'bookDelete', author: 'author', blurb: 'blurb', stock: 5, coverimageurl: 'url' });
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ title: 'bookDelete' }] });
      
          const deletedBook = await book.destroy();
          expect(deletedBook.title).toBe('bookDelete');
        });
      });
      
      
    
  })



