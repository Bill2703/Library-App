// Function to handle the login form submission
async function handleLoginFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Extracting data from the form
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    // Preparing request options for the login API call
    const requestOptions = createLoginRequestOptions(username, password);

    // Making the API call to perform login
    const response = await fetch("http://localhost:3000/users/login", requestOptions);
    const data = await response.json();

    // Handling response based on the status code
    if (response.status === 200) {
        processSuccessfulLogin(data.token);
    } else {
        displayErrorMessage(data.message || 'Invalid username or password');
    }
}

// Function to create request options for the login API call
function createLoginRequestOptions(username, password) {
    return {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    };
}

// Function to process successful login
function processSuccessfulLogin(token) {
    localStorage.setItem("token", token);
    window.location.assign("menu.html");
}

// Function to display error message on the login form
function displayErrorMessage(message) {
    const errorElement = document.getElementById('login-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block'; // Make the error element visible
    } else {
        // If there's no dedicated error element, fall back to using alert
        alert(message);
    }
}

// Adding event listener to the login form
document.getElementById("login-form").addEventListener("submit", handleLoginFormSubmission);
