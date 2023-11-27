document.addEventListener("DOMContentLoaded", async function () {
    
    const options = {
        headers: {
            authorization: localStorage.getItem("token"),
        }
    }

    // Make a GET request to your backend API to fetch the book data
    const response = await fetch('http://localhost:3000/books', options);

    // Check if the response status is not 200
    if (response.status !== 200) {
        // Redirect to index.html
        window.location.assign("./login.html");
        return;
    }

    console.log(response);
    const data = await response.json();

    // Get the container element where you want to display the books
    const bookList = document.getElementById('book-list');

    // Iterate through each book in the data
    data.forEach(book => {
        // Create a new li element for each book
        const bookItem = document.createElement('li');
        bookItem.className = 'book-item';

        // Create an image element for the book cover
        const coverImage = document.createElement('img');
        coverImage.src = book.coverimageurl; // Assuming coverImageURL is the property in your data
        coverImage.alt = 'Book Cover';

        // Create a div element for the book popup
        const bookPopup = document.createElement('div');
        bookPopup.className = 'book-popup';

        // Create elements for additional book information
        const titleElement = document.createElement('h3');
        titleElement.textContent = book.title;

        const authorElement = document.createElement('p');
        authorElement.textContent = 'Author: ' + book.author;

        const summaryElement = document.createElement('p');
        summaryElement.textContent = 'Summary: ' + book.blurb;

        const bookNowLink = document.createElement('a');
        bookNowLink.href = 'bookingSystem.html';

        // Store the selected book information in localStorage
        bookNowLink.addEventListener('click', function () {
            localStorage.setItem('selectedBook', JSON.stringify(book));
        });

        bookNowLink.className = 'card-button';
        bookNowLink.setAttribute('data-room', 'book');
        bookNowLink.textContent = 'Book Now';

        // Append the elements to the bookPopup
        bookPopup.appendChild(titleElement);
        bookPopup.appendChild(authorElement);
        bookPopup.appendChild(summaryElement);
        bookPopup.appendChild(bookNowLink);

        // Append the coverImage and bookPopup to the bookItem
        bookItem.appendChild(coverImage);
        bookItem.appendChild(bookPopup);

        // Append the bookItem to the bookList
        bookList.appendChild(bookItem);
    });
});

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    localStorage.removeItem("token")
});