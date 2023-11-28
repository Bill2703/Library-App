// Wait for the entire content of the document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Function to display a popup message
    const showPopup = (popupClass, message) => {
        // Select the popup element based on its class
        const popup = document.querySelector(`.${popupClass}`);
        if (popup) {
            // Set the text content of the popup with the provided message
            popup.textContent = message;
            // Add 'show' class to make the popup visible
            popup.classList.add('show');
            // Remove 'show' class after 3 seconds to hide the popup
            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000);
        }
    };

    // Function to decide which popup to show based on the action outcome
    const performAction = (action, isSuccess) => {
        // Display success message if the action is successful
        if (isSuccess) {
            showPopup('successful', 'Success! ' + action);
        } else {
            // Display failure message if the action fails
            showPopup('failed', 'Error occurred: ' + action);
        }
    };

    // Add event listeners to each book item for booking interaction
    const bookItems = document.querySelectorAll('.book-item');
    bookItems.forEach(item => {
        // Find the 'Book Now' button within the book item
        const bookNowLink = item.querySelector('.card-button');
        // Add a click event listener to the button
        bookNowLink.addEventListener('click', async (event) => {
            // Prevent the default action of the event (like submitting a form)
            event.preventDefault();

            // Implement the booking logic here
            try {
                // This is a placeholder function. Replace it with actual booking logic
                const isSuccess = await bookThisBookFunction(item);

                // Decide whether to show success or failure popup based on the booking outcome
                performAction('borrowBook', isSuccess);
            } catch (error) {
                // If an error occurs in the booking process, show a failure popup
                performAction('borrowBook', false);
            }
        });
    });

    // Add functionality to the modal popup
    const modal = document.querySelector('.modal');
    // Select all close buttons within the modal
    const closeBtns = document.querySelectorAll('.closebtn');
    // Add a click event listener to each close button
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove 'show' class from modal to hide it
            modal.classList.remove('show');
        });
    });

    // Close the modal if the user clicks outside of it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.remove('show');
        }
    };
});
