const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));
console.log(selectedBook);

bookName = selectedBook.title;

const nameSpace = document.getElementById("additionalInfo");
nameSpace.textContent=bookName;

async function updateStock(selectedBook) {
    try {
        // Extract relevant data (e.g., book name)
        const { title, stock } = selectedBook;

        console.log(selectedBook);
        // Craft a PATCH request to update the stock
        const response = await fetch(`http://localhost:3000/books/stock/${selectedBook.title}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'), // Include authorization header if needed
            },
            body: JSON.stringify({
                // Include the data you want to update, for example, reducing the stock by 1
                stock: stock - 1,
                title: selectedBook.title
            }),
        });

        //console.log(response);

        if (!response.ok) {
            throw new Error('Failed to update stock');
        }

        // Successfully updated stock, now you can redirect to the booking page or perform other actions
        // ...

        // Clear the selectedBook from localStorage (optional)
        localStorage.removeItem('selectedBook');
    } catch (error) {
        console.error('Error updating stock:', error);
    }
}

const bookNowLink = document.getElementById("bookNow")
bookNowLink.addEventListener('click', function () {
    updateStock(selectedBook);
});
