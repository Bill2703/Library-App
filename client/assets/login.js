// Function to process successful login
function processSuccessfulLogin(token, user) {
    // Store the user's token in localStorage
    localStorage.setItem("token", token);

    // Display a popup message indicating successful login
    showLoginSuccessPopup();

    localStorage.setItem("user_id", user.id)
    localStorage.setItem("username", user.username)

    // Schedule a redirection to the menu page after a short delay
    setTimeout(() => {
        window.location.assign("menu.html");
    }, 3000);
}

// Function to display a popup message for successful login
function showLoginSuccessPopup() {
    // Create a new div element to serve as the popup
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'lightgreen';
    popup.style.border = '1px solid green';
    popup.style.zIndex = '1000';
    popup.style.textAlign = 'center';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    popup.textContent = 'Login Successful! Redirecting...';

    // Append the popup to the document body
    document.body.appendChild(popup);

    // Automatically remove the popup after 3 seconds
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// Function to display error messages on the login form
function displayErrorMessage(message) {
    // Find the login error message element
    const errorElement = document.getElementById('login-error');

    // If the error element exists, display the error message
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        // Fallback to using an alert if no error element is found
        alert(message);
    }
}

// Function to handle form submission for login
async function handleLoginFormSubmission(event) {
    event.preventDefault();

    // Extract user input from form fields
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    // Prepare the HTTP request options for the login API call
    const requestOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    };

    // Perform the login API call
    try {
        const response = await fetch("http://localhost:3000/users/login", requestOptions);
        const data = await response.json();
        // Handle the API response
        if (response.status === 200) {
            processSuccessfulLogin(data.token, data.user);
        } else {
            displayErrorMessage(data.message || 'Invalid username or password');
        }
    } catch (error) {
        // Handle errors that occur during the fetch operation
        console.error('Login error:', error);
        displayErrorMessage('An error occurred while trying to log in.');
    }
}

document.getElementById('togglePassword').addEventListener('click', function (e) {
    // Toggle the type attribute using getAttribute() and setAttribute()
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Toggle the button text
    this.textContent = type === 'password' ? 'Show Password' : 'Hide Password';
});

// Attach the event listener to the login form
document.getElementById("login-form").addEventListener("submit", handleLoginFormSubmission);
