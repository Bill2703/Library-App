const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));
console.log(selectedBook);

bookName = selectedBook.title;
const nameSpace = document.getElementById("additionalInfo");
nameSpace.textContent=bookName;

async function updateStock(selectedBook) {
    try {
        // Extract relevant data (e.g., book name)
        const { title, stock } = selectedBook;

        const options = {
            headers: {
                authorization: localStorage.getItem("token"),
            }
        };

        // Craft a PATCH request to update the stock
        const response = await fetch(`http://localhost:3000/books/stock/${title}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'), // Include authorization header if needed
            },
            body: JSON.stringify({
                // Include the data you want to update, for example, reducing the stock by 1
                stock: stock - 1,
                title: title,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update stock');
        }

        // Successfully updated stock, now you can redirect to the booking page or perform other actions
        // For example, redirecting to a booking page
        window.location.assign("./bookpage.html");

        // Clear the selectedBook from localStorage (optional)
        localStorage.removeItem('selectedBook');
    } catch (error) {
        // Handle errors, for example, show an error message to the user
        console.error('Error updating stock:', error);
        // Show an error message to the user (you might want to implement this part)
    }
}

const bookNowLink = document.getElementById("bookNow");

bookNowLink.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default behavior of the link
    updateStock(selectedBook);
});


const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    localStorage.removeItem("token")
    localStorage.removeItem("selectedBook")
});

const back = document.getElementById("back");
back.addEventListener("click", () => {
    localStorage.removeItem("selectedBook")
})