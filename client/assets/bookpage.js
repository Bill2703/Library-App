document.addEventListener("DOMContentLoaded", async function () {
    
    const options = {
        headers: {
            authorization: localStorage.getItem("token"),
        }
    }
    const response = await fetch('http://localhost:3000/books', options);

    if (response.status !== 200) {
        window.location.assign("./login.html");
        return;
    }
    const data = await response.json();

    const bookList = document.getElementById('book-list');

    data.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.className = 'book-item';

        const coverImage = document.createElement('img');
        coverImage.src = book.coverimageurl;
        coverImage.alt = 'Book Cover';

        const bookPopup = document.createElement('div');
        bookPopup.className = 'book-popup';

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