// Retrieve and display the selected book's details
const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));
const nameSpace = document.getElementById("additionalInfo");
nameSpace.textContent = selectedBook.title;

// Get input fields for booking date and time
const bookingDateInput = document.getElementById('date');
const bookingTimeInput = document.getElementById('time');

// Function to update the stock of the selected book
async function updateStock(book) {
    try {
        const { title, stock } = book;

        // Sending a PATCH request to update the stock of the book
        const response = await fetch(`http://localhost:3000/books/stock/${title}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'), // Authorization header for secured endpoints
            },
            body: JSON.stringify({
                stock: stock - 1, // Decrease stock by 1
                title: title,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update stock');
        }

        // On successful stock update, redirect to the booking page
        window.location.assign("./bookpage.html");
    } catch (error) {
        // Log and show error message to the user
        console.error('Error updating stock:', error);
    }
}

// Event listener for the 'Book Now' button
const bookNowLink = document.getElementById("bookNow");
bookNowLink.addEventListener('click', function (event) {
    event.preventDefault();

    // Validate date and time inputs before proceeding
    const bookingDate = bookingDateInput.value;
    const bookingTime = bookingTimeInput.value;
    if (!bookingDate || !bookingTime) {
        alert("Please enter both date and time for the booking.");
        return;
    }

    // Proceed to update the book's stock
    updateStock(selectedBook);
});

// Event listener for the 'Logout' button
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("selectedBook");
});

// Event listener for the 'Back' button
const back = document.getElementById("back");
back.addEventListener("click", () => {
    localStorage.removeItem("selectedBook");
});
