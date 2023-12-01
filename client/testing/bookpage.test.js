/**
 * Test suite for fetchAndDisplayBooks functionality.
 * These tests focus on ensuring that the fetchAndDisplayBooks function correctly fetches book data
 * and updates the DOM to display the books with stock greater than 0.
 */
describe('fetchAndDisplayBooks', () => {
    beforeEach(() => {
        // Mock the global fetch function to return a resolved promise with predefined book data.
        jest.spyOn(global, 'fetch').mockResolvedValue({
            status: 200,
            json: () => Promise.resolve([
                { title: 'Book 1', stock: 1 },
                { title: 'Book 2', stock: 0 },
                { title: 'Book 3', stock: 2 }
            ])
        });
        // Set up a mock DOM structure to represent the book list in the HTML.
        document.body.innerHTML = '<ul id="book-list"></ul>';
    });

    afterEach(() => {
        // Restore all mocks to their original state after each test to prevent cross-test interference.
        jest.restoreAllMocks();
    });

    test('should fetch book data and display only books with stock greater than 0', async () => {
        // Act: Call the function to fetch and display books.
        await fetchAndDisplayBooks();

        // Assert: Verify that the correct books are displayed based on their stock values.
        const bookList = document.getElementById('book-list');
        expect(bookList.children.length).toBe(2); // Two books with stock > 0
        expect(bookList.textContent).toContain('Book 1');
        expect(bookList.textContent).toContain('Book 3');
        expect(bookList.textContent).not.toContain('Book 2'); // Book 2 has stock 0
    });
});

/**
 * Test suite for handling unauthorized access in fetchAndDisplayBooks.
 * These tests verify the behavior of the function when encountering different unauthorized status codes.
 */
describe('fetchAndDisplayBooks Unauthorized Access', () => {
    beforeEach(() => {
        // Mock window.location.assign function to prevent actual navigation during tests.
        jest.spyOn(window.location, 'assign').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore all mocks to their original state after each test.
        jest.restoreAllMocks();
    });

    test.each([401, 403, 404])('should redirect to login page on %i status code', async (statusCode) => {
        // Arrange: Mock fetch to return a response with different unauthorized status codes.
        fetchMock.mockResponseOnce(() => Promise.resolve({ status: statusCode }));

        // Act: Call the function to simulate fetching data.
        await fetchAndDisplayBooks();

        // Assert: Verify that the user is redirected to the login page on unauthorized access.
        expect(window.location.assign).toHaveBeenCalledWith('./login.html');
    });
});

/**
 * Test suite for validating the structure of book items.
 * These tests ensure that each book is correctly represented as a list item with detailed information.
 */
describe('Book Item Structure', () => {
    beforeEach(async () => {
        // Mock the global fetch function to return a resolved promise with a single book's data.
        jest.spyOn(global, 'fetch').mockResolvedValue({
            status: 200,
            json: () => Promise.resolve([{ title: 'Book 1', stock: 1, coverimageurl: 'image1.jpg' }])
        });
        // Set up the mock DOM and call the function to render the book list.
        document.body.innerHTML = '<ul id="book-list"></ul>';
        await fetchAndDisplayBooks();
    });

    afterEach(() => {
        // Restore all mocks to prevent interference between tests.
        jest.restoreAllMocks();
    });

    test('should create a list item for each book', () => {
        // Assert: Verify that each book is correctly represented as a list item in the DOM.
        const bookList = document.getElementById('book-list');
        expect(bookList.children.length).toBe(1); // One book in the list
        expect(bookList.children[0].tagName).toBe('LI');
    });

    test('should correctly set book details in the list item', () => {
        // Assert: Check if the book item contains correct details like image URL and title.
        const bookItem = document.querySelector('.book-item');
        expect(bookItem.querySelector('img').src).toContain('image1.jpg');
        expect(bookItem.textContent).toContain('Book 1');
    });
});
