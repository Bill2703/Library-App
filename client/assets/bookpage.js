// Function to handle fetching and displaying books
async function fetchAndDisplayBooks() {
    // Setup the request options, including authorization header
    const options = {
        headers: {
            authorization: localStorage.getItem("token"),
        }
    };

    // Fetch book data from the server
    const response = await fetch('http://localhost:3000/books', options);

    // Redirect to login page if the response status is not 200
    if (response.status !== 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("selectedBook");
        window.location.assign("./login.html");
        return;
    }

    // Parse the JSON response to get book data
    const books = await response.json();

    // Get the book list container in the DOM
    const bookList = document.getElementById('book-list');

    // Iterate over each book in the data
    books.forEach(book => {
        // Only display the book if its stock is greater than 0
        if (book.stock > 0) {
            // Create and append book elements to the book list
            appendBookToDOM(book, bookList);
        }
    });
}

// Function to create and append book elements to the DOM
function appendBookToDOM(book, bookList) {
    // Create list item for the book
    const bookItem = document.createElement('li');
    bookItem.className = 'book-item';

    // Create and setup book cover image
    const coverImage = document.createElement('img');
    coverImage.src = book.coverimageurl;
    coverImage.alt = 'Book Cover';

    // Create popup div for book details
    const bookPopup = document.createElement('div');
    bookPopup.className = 'book-popup';

    // Add book title, author, and summary
    bookPopup.appendChild(createElementWithText('h3', book.title));
    bookPopup.appendChild(createElementWithText('p', 'Author: ' + book.author));
    bookPopup.appendChild(createElementWithText('p', 'Summary: ' + book.blurb));

    // Create and setup 'Book Now' link
    const bookNowLink = document.createElement('a');
    bookNowLink.href = 'bookingSystem.html';
    bookNowLink.className = 'card-button';
    bookNowLink.setAttribute('data-room', 'book');
    bookNowLink.textContent = 'Book Now';
    bookNowLink.addEventListener('click', () => {
        localStorage.setItem('selectedBook', JSON.stringify(book));
    });

    bookPopup.appendChild(bookNowLink);

    // Append cover image and popup to book item
    bookItem.appendChild(coverImage);
    bookItem.appendChild(bookPopup);

    // Append the book item to the book list
    bookList.appendChild(bookItem);
}

// Helper function to create an HTML element with text content
function createElementWithText(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

// Event listener for logout functionality
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    localStorage.removeItem("token");
});

// Start fetching and displaying books on DOMContentLoaded
document.addEventListener("DOMContentLoaded", fetchAndDisplayBooks);