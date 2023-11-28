// Event listener for the registration form submission
document.getElementById("register-form").addEventListener("submit", handleRegistration);

// Handles the registration process
async function handleRegistration(e) {
    e.preventDefault();

    // Extracting form data
    const form = new FormData(e.target);
    const formData = {
        fullName: form.get("fullName"),
        email: form.get("email"),
        username: form.get("username"),
        password: form.get("password")
    };

    // Validate form data
    if (!isValidFormData(formData)) return;

    // Make the registration request
    try {
        const response = await makeRegistrationRequest(formData);
        handleRegistrationResponse(response);
    } catch (error) {
        alert("An error occurred during registration.");
    }
}

// Validates form data
function isValidFormData({ fullName, email, password }) {
    if (!validatePassword(password, fullName)) {
        alert("Password must be more than 8 characters, include a capital letter, a number, a special character, and must not include your name.");
        return false;
    }
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    return true;
}

// Makes the registration request to the server
async function makeRegistrationRequest({ fullName, email, username, password }) {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName,
            email,
            username,
            password
        })
    };
    return await fetch("http://localhost:3000/users/register", options);
}

// Handles the server's response to the registration request
function handleRegistrationResponse(response) {
    if (response.status === 201) {
        window.location.assign("login.html");
    } else {
        response.json().then(data => alert(data.error));
    }
}

// Function to validate password
function validatePassword(password, fullName) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length > 8;
    const doesNotIncludeName = !password.toLowerCase().includes(fullName.toLowerCase());

    return hasUpperCase && hasNumber && hasSpecialChar && isLongEnough && doesNotIncludeName;
}

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}
