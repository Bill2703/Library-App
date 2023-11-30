// Function to handle fetching and displaying books
async function fetchAndDisplayBooks() {
  // Setup the request options, including authorization header
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  // Fetch book data from the server
  const response = await fetch("http://localhost:3000/books", options);

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
  const bookList = document.getElementById("book-list");

  // Iterate over each book in the data
  books.forEach((book) => {
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
  const bookItem = document.createElement("li");
  bookItem.className = "book-item";

  // Create and setup book cover image
  const coverImage = document.createElement("img");
  coverImage.src = book.coverimageurl;
  coverImage.alt = "Book Cover";

  // Create div container for book details
  const bookDetailContainer = document.createElement("div");
  bookDetailContainer.className = "book-detail-container";

  // Create popup div for book details
  const bookPopup = document.createElement("div");
  bookPopup.className = "book-popup";

  // Add book title, author, and summary to the popup
  bookPopup.appendChild(createElementWithText("h3", book.title));
  bookPopup.appendChild(createElementWithText("p", "Author: " + book.author));
  bookPopup.appendChild(createElementWithText("p", "Summary: " + book.blurb));

  // Append book details to the detail container
  bookDetailContainer.appendChild(bookPopup);

  // Create and setup 'Book Now' link
  const bookNowLink = document.createElement("a");
  bookNowLink.href = "bookingSystem.html";
  bookNowLink.className = "card-button";
  bookNowLink.setAttribute("data-room", "book");

  // Add text node for 'Book Now' after the stock span
  bookNowLink.appendChild(document.createTextNode(" Book Now"));
  
  // Create and setup 'Stock' span to be included inside the 'Book Now' link
  const stockSpan = document.createElement("span");
  stockSpan.className = "stock-info";
  stockSpan.textContent = `Stock: ${book.stock}`;

  // Append the 'Stock' span to the 'Book Now' link
  bookNowLink.appendChild(stockSpan);

  // Add event listener to store selected book on click
  bookNowLink.addEventListener("click", () => {
    localStorage.setItem("selectedBook", JSON.stringify(book));
  });

  // Append the 'Book Now' link to the book detail container
  bookDetailContainer.appendChild(bookNowLink);

  // Append cover image and detail container to the book item
  bookItem.appendChild(coverImage);
  bookItem.appendChild(bookDetailContainer);

  // Append the book item to the book list
  bookList.appendChild(bookItem);
}

// Helper function to create an HTML element with text content
function createElementWithText(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
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
  localStorage.removeItem("username")
  localStorage.removeItem("user_id")
});

// Start fetching and displaying books on DOMContentLoaded
document.addEventListener("DOMContentLoaded", fetchAndDisplayBooks);
