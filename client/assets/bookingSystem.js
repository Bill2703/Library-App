// Global variables for form inputs and selected book details
const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));
const bookingDateInput = document.getElementById('date');
const bookingTimeInput = document.getElementById('time');
const bookNowLink = document.getElementById("bookNow");
const logout = document.getElementById("logout");
const back = document.getElementById("back");

// Display the selected book's title in the designated area
function displaySelectedBook() {
    const nameSpace = document.getElementById("additionalInfo");
    nameSpace.textContent = selectedBook.title;
}

// Update the stock of the selected book on the server
async function updateStock(book) {
    const { title, stock } = book;
    const response = await fetch(`http://localhost:3000/books/stock/${title}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
        },
        body: JSON.stringify({ stock: stock - 1, title: title }),
    });

    if (!response.ok) {
        throw new Error('Failed to update stock');
    }
}

// Simulate sending a booking confirmation
function sendBookingConfirmation(book, date, time) {
    console.log(`Booking confirmation for '${book.title}':`);
    console.log(`Date: ${date}`);
    console.log(`Time: ${time}`);
}

// Add event listeners
function setupEventListeners() {
    bookNowLink.addEventListener('click', handleBookNowClick);
    logout.addEventListener("click", handleLogout);
    back.addEventListener("click", handleBack);
}

// Handle 'Book Now' button click
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
        sendBookingConfirmation(selectedBook, bookingDate, bookingTime);
    } catch (error) {
        console.error('Error during booking:', error);
    }
}

// Handle 'Logout' button click
function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("selectedBook");
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
