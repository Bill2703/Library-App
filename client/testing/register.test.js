/**
 * These tests ensure that the function correctly handles the registration form submission process.
 * This includes form data extraction, validation, server request initiation, and response handling.
 */
describe('handleRegistration Function', () => {
    let eventMock, formDataMock;

    beforeEach(() => {
        // Mock the FormData and event.preventDefault() for the form submission
        formDataMock = new FormData();
        formDataMock.get = jest.fn().mockImplementation((key) => {
            return { fullName: 'John Doe', email: 'john@example.com', username: 'johndoe', password: 'ValidPass123#' }[key];
        });
        eventMock = { preventDefault: jest.fn(), target: formDataMock };

        // Mocking other functions called within handleRegistration
        global.isValidFormData = jest.fn(() => true);
        global.makeRegistrationRequest = jest.fn().mockResolvedValue({ status: 200 });
        global.handleRegistrationResponse = jest.fn();
        global.alert = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should prevent default form submission and extract form data', async () => {
        await handleRegistration(eventMock);
        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect(formDataMock.get).toHaveBeenCalledWith('fullName');
        expect(formDataMock.get).toHaveBeenCalledWith('email');
        expect(formDataMock.get).toHaveBeenCalledWith('username');
        expect(formDataMock.get).toHaveBeenCalledWith('password');
    });

    test('should validate the extracted user data', async () => {
        await handleRegistration(eventMock);
        expect(global.isValidFormData).toHaveBeenCalledWith({
            fullName: 'John Doe',
            email: 'john@example.com',
            username: 'johndoe',
            password: 'ValidPass123#'
        });
    });

    test('should make a registration request if data is valid', async () => {
        await handleRegistration(eventMock);
        expect(global.makeRegistrationRequest).toHaveBeenCalledWith({
            fullName: 'John Doe',
            email: 'john@example.com',
            username: 'johndoe',
            password: 'ValidPass123#'
        });
    });

    test('should handle the registration response', async () => {
        const responseMock = { status: 200 };
        global.makeRegistrationRequest.mockResolvedValue(responseMock);
        await handleRegistration(eventMock);
        expect(global.handleRegistrationResponse).toHaveBeenCalledWith(responseMock);
    });

    test('should alert the user on registration error', async () => {
        global.makeRegistrationRequest.mockRejectedValue(new Error('Registration error'));
        await handleRegistration(eventMock);
        expect(global.alert).toHaveBeenCalledWith('An error occurred during registration.');
    });
});

/**
 * These tests verify that the function correctly updates the colors of checklist items
 * based on whether the password meets specific criteria.
 * It checks for conditions like password length, uppercase letter, number, special character, and name exclusion.
 */
describe('updatePasswordChecklist Function', () => {
    // Create mock elements for each checklist item before each test
    beforeEach(() => {
        const createMockElement = (id) => {
            const element = document.createElement('span');
            element.id = id;
            document.body.appendChild(element);
            return element;
        };

        global.document.getElementById = jest.fn((id) => {
            return {
                'lengthCheck': createMockElement('lengthCheck'),
                'capitalCheck': createMockElement('capitalCheck'),
                'numberCheck': createMockElement('numberCheck'),
                'specialCheck': createMockElement('specialCheck'),
                'nameCheck': createMockElement('nameCheck')
            }[id];
        });
    });

    // Clear the document body after each test
    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should turn checklist items green for a valid password', () => {
        const password = 'ValidP@ssw0rd!';
        const fullName = 'John Doe';

        updatePasswordChecklist(password, fullName);

        expect(document.getElementById('lengthCheck').style.color).toBe('green');
        expect(document.getElementById('capitalCheck').style.color).toBe('green');
        expect(document.getElementById('numberCheck').style.color).toBe('green');
        expect(document.getElementById('specialCheck').style.color).toBe('green');
        expect(document.getElementById('nameCheck').style.color).toBe('green');
    });

    test('should turn checklist items red for an invalid password', () => {
        const password = 'invalid';
        const fullName = 'invalid';

        updatePasswordChecklist(password, fullName);

        expect(document.getElementById('lengthCheck').style.color).toBe('red');
        expect(document.getElementById('capitalCheck').style.color).toBe('red');
        expect(document.getElementById('numberCheck').style.color).toBe('red');
        expect(document.getElementById('specialCheck').style.color).toBe('red');
        expect(document.getElementById('nameCheck').style.color).toBe('red');
    });
});

/**
 * These tests ensure that user input data (fullName, email, password) is validated correctly.
 * It checks for both valid and invalid scenarios for email and password inputs.
 */
describe('isValidFormData Function', () => {
    beforeEach(() => {
        // Mock global alert and dependent functions
        global.alert = jest.fn();
        global.updatePasswordChecklist = jest.fn();
        global.validatePassword = jest.fn();
        global.validateEmail = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should return true for valid email and password', () => {
        // Arrange: Mock validatePassword and validateEmail to return true for this test
        validatePassword.mockReturnValue(true);
        validateEmail.mockReturnValue(true);

        // Act: Call isValidFormData with valid data
        const result = isValidFormData({ fullName: 'John Doe', email: 'john@example.com', password: 'ValidPass1!' });

        // Assert: Check that the function returns true
        expect(result).toBe(true);
        expect(updatePasswordChecklist).toHaveBeenCalledWith('ValidPass1!', 'John Doe');
    });

    test('should alert and return false for invalid password', () => {
        // Arrange: Mock validatePassword to return false for this test
        validatePassword.mockReturnValue(false);

        // Act: Call isValidFormData with an invalid password
        const result = isValidFormData({ fullName: 'John Doe', email: 'john@example.com', password: 'invalid' });

        // Assert: Check that the function alerts and returns false
        expect(result).toBe(false);
        expect(alert).toHaveBeenCalledWith("Your password does not meet the requirements.");
    });

    test('should alert and return false for invalid email', () => {
        // Arrange: Mock validatePassword to return true and validateEmail to return false
        validatePassword.mockReturnValue(true);
        validateEmail.mockReturnValue(false);

        // Act: Call isValidFormData with an invalid email
        const result = isValidFormData({ fullName: 'John Doe', email: 'invalid', password: 'ValidPass1!' });

        // Assert: Check that the function alerts and returns false
        expect(result).toBe(false);
        expect(alert).toHaveBeenCalledWith("Please enter a valid email address.");
    });
});

/**
 * These tests ensure that the function correctly constructs and sends a registration request to the server.
 * It checks for proper request configuration including method, headers, and body content.
 */
describe('makeRegistrationRequest Function', () => {
    // Mock global fetch function
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should send a POST request with correct headers and body', async () => {
        // Arrange: Mock fetch to resolve with a sample response
        const mockResponse = { status: 201 };
        fetch.mockResolvedValue(mockResponse);
        const userData = {
            fullName: 'John Doe',
            email: 'john@example.com',
            username: 'johndoe',
            password: 'ValidPass123!'
        };

        // Act: Call makeRegistrationRequest with mock user data
        const response = await makeRegistrationRequest(userData);

        // Assert: Verify the fetch call with correct arguments
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        expect(response).toEqual(mockResponse);
    });

    test('should handle server response errors', async () => {
        // Arrange: Mock fetch to reject with a network error
        const networkError = new Error('Network error');
        fetch.mockRejectedValue(networkError);

        // Act & Assert: Call makeRegistrationRequest and expect it to throw an error
        await expect(makeRegistrationRequest({})).rejects.toThrow('Network error');
    });
});

/**
 * These tests ensure that the function correctly handles different server responses
 * after a registration attempt. This includes showing a success popup and redirecting
 * on successful registration and displaying error messages on failed registration.
 */
describe('handleRegistrationResponse Function', () => {
    beforeEach(() => {
        // Mock global functions and properties
        global.showRegistrationSuccessPopup = jest.fn();
        global.setTimeout = jest.fn().mockImplementation((callback) => callback());
        global.window = { location: { assign: jest.fn() } };
        global.alert = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should display success popup and redirect on successful registration', () => {
        // Arrange: Mock a successful response
        const response = { status: 201 };

        // Act: Call handleRegistrationResponse with a successful response
        handleRegistrationResponse(response);

        // Assert: Verify that the success popup is shown and redirection occurs
        expect(showRegistrationSuccessPopup).toHaveBeenCalled();
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
        expect(window.location.assign).toHaveBeenCalledWith("login.html");
    });

    test('should display error message on failed registration', async () => {
        // Arrange: Mock a failed response with a JSON error message
        const errorMessage = { error: "Registration failed" };
        const response = {
            status: 400,
            json: jest.fn().mockResolvedValue(errorMessage)
        };

        // Act: Call handleRegistrationResponse with a failed response
        await handleRegistrationResponse(response);

        // Assert: Verify that the correct error message is alerted
        expect(response.json).toHaveBeenCalled();
        expect(alert).toHaveBeenCalledWith(errorMessage.error);
    });

    test('should alert generic error message if response parsing fails', async () => {
        // Arrange: Mock a response that fails to parse
        const response = {
            status: 400,
            json: jest.fn().mockRejectedValue(new Error('Parsing error'))
        };

        // Act: Call handleRegistrationResponse with the failing response
        await handleRegistrationResponse(response);

        // Assert: Verify that a generic error message is alerted
        expect(response.json).toHaveBeenCalled();
        expect(alert).toHaveBeenCalledWith("Failed to parse error message.");
    });
});

/**
 * These tests verify that the function creates a popup, styles it appropriately,
 * sets the correct text, and ensures that it is removed from the DOM after a set time.
 */
describe('showRegistrationSuccessPopup Function', () => {
    beforeEach(() => {
        // Mock global setTimeout and document.body.appendChild
        jest.useFakeTimers();
        document.body.appendChild = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        document.body.innerHTML = ''; // Clear the body to avoid any leftover elements
    });

    test('should create, style, and display a registration success popup', () => {
        // Arrange: Mock stylePopup function
        global.stylePopup = jest.fn();

        // Act: Call showRegistrationSuccessPopup function
        showRegistrationSuccessPopup();

        // Assert: Verify popup creation, styling, and text content
        expect(document.body.appendChild).toHaveBeenCalledTimes(1);
        const popup = document.body.appendChild.mock.calls[0][0];
        expect(popup.textContent).toBe('Registration Successful! Redirecting to login...');
        expect(stylePopup).toHaveBeenCalledWith(popup);
    });

    test('should remove the popup from the DOM after 3 seconds', () => {
        // Arrange & Act: Call showRegistrationSuccessPopup and advance timers
        showRegistrationSuccessPopup();
        jest.advanceTimersByTime(3000);

        // Assert: Check that the popup is removed after the specified time
        expect(document.body.innerHTML).toBe('');
    });
});

/**
 * These tests verify that the function correctly applies styles to a popup element.
 * It checks the properties like position, color, padding, border, and others to ensure they meet the design requirements.
 */
describe('stylePopup Function', () => {
    let popup;

    beforeEach(() => {
        // Create a mock popup element before each test
        popup = document.createElement('div');
    });

    test('should apply correct styles to the popup', () => {
        // Act: Call stylePopup with the mock popup element
        stylePopup(popup);

        // Assert: Verify that each style property is set as expected
        expect(popup.style.position).toBe('fixed');
        expect(popup.style.left).toBe('50%');
        expect(popup.style.top).toBe('50%');
        expect(popup.style.transform).toBe('translate(-50%, -50%)');
        expect(popup.style.padding).toBe('20px');
        expect(popup.style.backgroundColor).toBe('lightgreen');
        expect(popup.style.border).toBe('1px solid green');
        expect(popup.style.zIndex).toBe('1000');
        expect(popup.style.textAlign).toBe('center');
        expect(popup.style.boxShadow).toBe('0 4px 8px rgba(0, 0, 0, 0.1)');
    });
});

/**
 * These tests check the function's ability to accurately validate email addresses.
 * It includes testing various cases of valid and invalid email formats.
 */
describe('validateEmail Function', () => {
    test('should return true for valid email addresses', () => {
        // Arrange: List of valid email addresses
        const validEmails = [
            'test@example.com',
            'firstname.lastname@example.co',
            'email@subdomain.example.com',
            '1234567890@example.com',
            'email@example-one.com',
            '_______@example.com',
            'email@example.name',
            'email@example.co.yl',
            'firstname-lastname@example.com'
        ];

        // Act & Assert: Validate each email and expect true
        validEmails.forEach(email => {
            expect(validateEmail(email)).toBe(true);
        });
    });

    test('should return false for invalid email addresses', () => {
        // Arrange: List of invalid email addresses
        const invalidEmails = [
            'plainaddress',
            '@no-local-part.com',
            'Outlook Contact <outlook-contact@domain.com>',
            'no-at-sign.net',
            'no-tld@domain',
            ';beginning-semicolon@domain.co.uk',
            'middle-semicolon@domain.co;uk',
            'trailing-semicolon@domain.com;',
            '"email@domain.com',
            'email@domain@domain.com',
            '.email@domain.com',
            'email.@domain.com',
            'email..email@domain.com',
            'あいうえお@domain.com',
            'email@domain.com (Joe Smith)',
            'email@domain',
            'email@-domain.com',
            'email@domain..com'
        ];

        // Act & Assert: Validate each email and expect false
        invalidEmails.forEach(email => {
            expect(validateEmail(email)).toBe(false);
        });
    });
});

/**
 * These tests verify that the function accurately validates a password based on several criteria:
 * - Presence of at least one uppercase letter
 * - Presence of at least one number
 * - Presence of at least one special character
 * - Minimum length requirement
 * - Exclusion of the user's full name
 */
describe('validatePassword Function', () => {
    test('should return true for a password that meets all criteria', () => {
        // Arrange: Create a password that meets all the specified criteria
        const password = 'ValidPass1!';
        const fullName = 'John Doe';

        // Act: Validate the password
        const result = validatePassword(password, fullName);

        // Assert: The function should return true
        expect(result).toBe(true);
    });

    test('should return false for a password lacking an uppercase letter', () => {
        // Arrange: Create a password missing an uppercase letter
        const password = 'validpass1!';
        const fullName = 'John Doe';

        // Act & Assert: The function should return false
        expect(validatePassword(password, fullName)).toBe(false);
    });

    test('should return false for a password lacking a number', () => {
        // Arrange: Create a password missing a number
        const password = 'ValidPass!';
        const fullName = 'John Doe';

        // Act & Assert: The function should return false
        expect(validatePassword(password, fullName)).toBe(false);
    });

    test('should return false for a password lacking a special character', () => {
        // Arrange: Create a password missing a special character
        const password = 'ValidPass1';
        const fullName = 'John Doe';

        // Act & Assert: The function should return false
        expect(validatePassword(password, fullName)).toBe(false);
    });

    test('should return false for a password that is too short', () => {
        // Arrange: Create a password that is too short
        const password = 'Va1!';
        const fullName = 'John Doe';

        // Act & Assert: The function should return false
        expect(validatePassword(password, fullName)).toBe(false);
    });

    test('should return false for a password that includes the user\'s full name', () => {
        // Arrange: Create a password that includes the user's full name
        const password = 'JohnDoe1!';
        const fullName = 'John Doe';

        // Act & Assert: The function should return false
        expect(validatePassword(password, fullName)).toBe(false);
    });
});

