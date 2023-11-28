// Add an event listener to handle the registration form submission
document.getElementById("register-form").addEventListener("submit", handleRegistration);

// Function that handles the registration form submission
async function handleRegistration(event) {
    event.preventDefault(); // Prevent the default form submission

    // Extracting data from the form
    const formData = new FormData(event.target);
    const userData = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password")
    };

    // Validate the extracted user data
    if (!isValidFormData(userData)) {
        return; // Exit if the data is invalid
    }

    // Attempt to register the user with the provided data
    try {
        const response = await makeRegistrationRequest(userData);
        // Handle the server's response to the registration request
        handleRegistrationResponse(response);
    } catch (error) {
        alert("An error occurred during registration.");
    }
}

// Function to validate the user's input data
function isValidFormData({ fullName, email, password }) {
    // Check if the password meets the criteria
    if (!validatePassword(password, fullName)) {
        alert("Password must be more than 8 characters, include a capital letter, a number, a special character, and must not include your name.");
        return false;
    }

    // Check if the email is in a valid format
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}

// Function to send a registration request to the server
async function makeRegistrationRequest({ fullName, email, username, password }) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, email, username, password })
    };
    return await fetch("http://localhost:3000/users/register", requestOptions);
}

// Function to handle the server's response after the registration attempt
function handleRegistrationResponse(response) {
    if (response.status === 201) {
        // If registration is successful, display a success popup and redirect
        showRegistrationSuccessPopup();
        setTimeout(() => {
            window.location.assign("login.html");
        }, 3000);
    } else {
        // If registration failed, display the error message
        response.json().then(data => alert(data.error)).catch(() => alert("Failed to parse error message."));
    }
}

// Function to show a successful registration popup
function showRegistrationSuccessPopup() {
    const popup = document.createElement('div');
    // Style the popup for successful registration
    stylePopup(popup);
    popup.textContent = 'Registration Successful! Redirecting to login...';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000); // Remove the popup after 3 seconds
}

// Function to style the popup element
function stylePopup(popup) {
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
}

// Function to validate the format of the email
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

// Function to validate the strength and criteria of the password
function validatePassword(password, fullName) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>-=+~]/.test(password);
    const isLongEnough = password.length > 8;
    const doesNotIncludeName = !password.toLowerCase().includes(fullName.toLowerCase());

    console.log({ hasUpperCase, hasNumber, hasSpecialChar, isLongEnough, doesNotIncludeName });

    return hasUpperCase && hasNumber && hasSpecialChar && isLongEnough && doesNotIncludeName;
}

document.getElementById('togglePassword').addEventListener('click', function (e) {
    // Toggle the type attribute using getAttribute() and setAttribute()
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Toggle the button text
    this.textContent = type === 'password' ? 'Show Password' : 'Hide Password';
});
