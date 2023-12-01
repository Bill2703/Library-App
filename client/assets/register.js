// Add an event listener to handle the registration form submission
document
  .getElementById("register-form")
  .addEventListener("submit", handleRegistration);

// Function that handles the registration form submission
async function handleRegistration(event) {
  event.preventDefault(); // Prevent the default form submission

  // Extracting data from the form
  const formData = new FormData(event.target);
  const userData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  // Validate the extracted user data
  if (!isValidFormData(userData)) {
    alert("Please fill out all fields.");
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
function isValidFormData({ email, password }) {
  // Check if the password meets the criteria
  if (!validatePassword(password)) {
    alert("Your password does not meet the requirements.");
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
async function makeRegistrationRequest({
  fullName,
  email,
  username,
  password,
}) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, email, username, password }),
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
    response
      .json()
      .then((data) => alert(data.error))
      .catch(() => alert("Failed to parse error message."));
  }
}

// Function to show a successful registration popup
function showRegistrationSuccessPopup() {
  const popup = document.createElement("div");
  // Style the popup for successful registration
  stylePopup(popup);
  popup.textContent = "Registration Successful! Redirecting to login...";
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 3000); // Remove the popup after 3 seconds
}

// Function to style the popup element
function stylePopup(popup) {
  popup.style.position = "fixed";
  popup.style.left = "50%";
  popup.style.top = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px";
  popup.style.backgroundColor = "lightgreen";
  popup.style.border = "1px solid green";
  popup.style.zIndex = "1000";
  popup.style.textAlign = "center";
  popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
}

// Function to validate the format of the email
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

// Function to validate the strength and criteria of the password
function validatePassword(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>+=~\\-]/.test(password);
  const isLongEnough = password.length > 8;

  return (
    hasUpperCase &&
    hasNumber &&
    hasSpecialChar &&
    isLongEnough
  );
}

// The revised form submission event listener
document
  .getElementById("register-form")
  .addEventListener("register", function (event) {
    event.preventDefault();

    const password = document.getElementById("password").value;

    if (!validatePassword(password)) {
      showPasswordCriteriaPopup();
    } else {
      handleRegistration(event);
    }
  });
  const passwordInput = document.querySelector(".pass-field input");
  const eyeIcon = document.querySelector(".pass-field i");
  const requirementList = document.querySelectorAll(".requirement-list li");


  const requirements = [
      { regex: /.{8,}/, index: 0 },
      { regex: /[0-9]/, index: 1 },
      { regex: /[a-z]/, index: 2 },
      { regex: /[^A-Za-z0-9]/, index: 3 },
      { regex: /[A-Z]/, index: 4 },
  ]

  passwordInput.addEventListener("keyup", (e) => {
      requirements.forEach(item => {

          const isValid = item.regex.test(e.target.value);
          const requirementItem = requirementList[item.index];


          if (isValid) {
              requirementItem.classList.add("valid");
              requirementItem.firstElementChild.className = "fa-solid fa-check";
          } else {
              requirementItem.classList.remove("valid");
              requirementItem.firstElementChild.className = "fa-solid fa-circle";
          }
      });
  });

  eyeIcon.addEventListener("click", () => {
      // Toggle the password input type between "password" and "text"
      passwordInput.type = passwordInput.type === "password" ? "text" : "password";

      // Update the eye icon class based on the password input type
      eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`;
  });
