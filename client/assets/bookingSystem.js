// Global variables for form inputs and selected book details
const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));
const bookReturn = document.getElementById("returnBook");
const bookingDateInput = document.getElementById('date');
const bookingTimeInput = document.getElementById('time');
const ratingBtn = document.getElementById("rating-btn");
const bookNowLink = document.getElementById("bookNow");
const stars = document.querySelectorAll(".stars i")
const logout = document.getElementById("logout");
const back = document.getElementById("back");
let alreadyRented =  false;


// Display the selected book's title in the designated area
function displaySelectedBook() {
    const nameSpace = document.getElementById("additionalInfo");
    nameSpace.textContent = selectedBook.title;
}


stars.forEach((star, index1) => {
    let num = index1 + 1; 
    star.addEventListener("click", () => {
        stars.forEach((star, index2) => {
            index1 >= index2 ? star.classList.add("active") : star.classList.remove("active")
        })
        localStorage.setItem("rating", num)
        let selectedRating1 = localStorage.getItem("rating");
        console.log(selectedRating1);
    })
})

async function updateRating(book) {
    const selectedRating = localStorage.getItem("rating");
    const { title } = book;
    // Check if a rating has been selected
    if (!selectedRating) {
        alert("Please select a rating before submitting.");
        return;
    }

    // Update the rating on the server
    try {
        const response = await fetch(`https://library-app-xm9c.onrender.com/rating/${title}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({ rating: selectedRating }),
        });
        
        if (!response.ok) {
            window.location.assign("./login.html")
        } else {
            alert("Thanks for the rating!")
            localStorage.removeItem("rating");
            localStorage.removeItem("selectedBook")
            window.location.assign("./bookpage.html")
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        // Handle the error as needed (e.g., show an alert)
    }
};


// Update the stock of the selected book on the server
async function updateStock(book) {
    const { title, stock } = book;
    const user_id = localStorage.getItem("user_id")
    const username = localStorage.getItem("username")
    const book_id = book.id;
    try {
        const response = await fetch(`https://library-app-xm9c.onrender.com/books/stock/${title}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({ stock: stock - 1, title: title, user_id: user_id, username: username, book_id: book_id }),
        });

        if (!response.ok) {
            alert("You have already rented this book.");
            alreadyRented = true;
        }
    } catch (error) {
        console.error('Error during updateStock:', error);
    }
}

async function returnBook(book) {
    const user_id = localStorage.getItem("user_id");
    const { title, stock } = book;
    try {
        const response = await fetch(`https://library-app-xm9c.onrender.com/books/return/${title}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({ user_id: user_id }),
        });

        const ratingBox = document.querySelector(".rating-box")

        if (!response.ok) {
            if (response.status === 400) {
                alert("You have not rented this book yet!");
            } else {
                localStorage.removeItem("user_id");
                localStorage.removeItem("username")
                localStorage.removeItem("selectedBook");
                window.location.assign("./login.html");
                return;
            }
        } else {
            alert("Thanks for returning the book!")
            ratingBox.style.visibility = "visible";
        }
    } catch (error) {
        console.error('Error during returnBook:', error);
    }
}

// Simulate sending a booking confirmation
function sendBookingConfirmation(book, date, time) {
    // Create a popup element
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid black';
    popup.style.zIndex = 1000;
    popup.style.textAlign = 'center';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    // Set the text for the popup
    popup.innerHTML = `<strong>Booking Confirmation</strong><br>${book.title}<br>Date: ${date}<br>Time: ${time}`;

    // Append the popup to the body
    document.body.appendChild(popup);

    // Remove the popup after 7 seconds
    setTimeout(() => {
        popup.remove();
        window.location.assign("./bookpage.html")
        localStorage.removeItem("selectedBook");
    }, 3000);

}
if(selectedBook.stock === 0){
    bookNowLink.style.display = 'none'
}

function setupEventListeners() {
    bookNowLink.addEventListener('click', handleBookNowClick);
    logout.addEventListener("click", handleLogout);
    back.addEventListener("click", handleBack);
    bookReturn.addEventListener("click",() => returnBook(selectedBook))
    ratingBtn.addEventListener("click", () => updateRating(selectedBook))
}

async function handleBookNowClick(event) {
    event.preventDefault();
    const bookingDate = bookingDateInput.value;
    const bookingTime = bookingTimeInput.value;


    if (!bookingDate || !bookingTime) {
        alert("Please enter both date and time for the booking.");
        return;
    }

    try {
        await updateStock(selectedBook);
        if(alreadyRented === false){
            sendBookingConfirmation(selectedBook, bookingDate, bookingTime);
        } else {
            window.location.assign("./bookpage.html")
            localStorage.removeItem("selectedBook");
        }

    } catch (error) {
        console.error('Error during booking:', error);
    }
}


// Handle 'Logout' button click
function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("selectedBook");
    localStorage.removeItem("username")
    localStorage.removeItem("user_id")
}

// Handle 'Back' button click
function handleBack() {
    localStorage.removeItem("selectedBook");
}

// Initialize the script
function init() {
    displaySelectedBook();
    setupEventListeners();
}

// Start the script once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
