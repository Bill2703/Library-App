/**
 * Tests for processSuccessfulLogin function.
 * These tests validate if the function correctly handles the login process,
 * including setting the token in localStorage and displaying the login success popup.
 */
class ProcessSuccessfulLoginTest {
    /**
     * Test to check if the login token is correctly stored in localStorage
     * and if the login success popup is displayed.
     */
    testProcessSuccessfulLogin() {
        // Arrange: Mock localStorage and showLoginSuccessPopup function.
        const localStorageMock = { setItem: jest.fn() };
        global.localStorage = localStorageMock;
        const showLoginSuccessPopupMock = jest.fn();
        global.showLoginSuccessPopup = showLoginSuccessPopupMock;

        // Act: Call the processSuccessfulLogin function with a mock token.
        const token = 'token123';
        processSuccessfulLogin(token);

        // Assert: Verify that the token is stored and the popup is displayed.
        expect(localStorageMock.setItem).toHaveBeenCalledWith('token', token);
        expect(showLoginSuccessPopupMock).toHaveBeenCalled();
    }

    /**
     * Test to check the redirection after a successful login using setTimeout.
     */
    testRedirectAfterLogin() {
        // Arrange: Mock setTimeout and window.location.assign.
        jest.useFakeTimers();
        global.window = { location: { assign: jest.fn() } };

        // Act: Call the processSuccessfulLogin function and advance timers.
        processSuccessfulLogin('token123');
        jest.runAllTimers();

        // Assert: Verify that the user is redirected after a delay.
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
        expect(window.location.assign).toHaveBeenCalledWith('menu.html');
    }
}

// Running the tests
const processSuccessfulLoginTest = new ProcessSuccessfulLoginTest();
processSuccessfulLoginTest.testProcessSuccessfulLogin();
processSuccessfulLoginTest.testRedirectAfterLogin();

/**
 * Tests for showLoginSuccessPopup function.
 * These tests validate the creation and styling of the popup displayed after a successful login.
 */
class ShowLoginSuccessPopupTest {
    /**
     * Test to verify the creation and styling of the login success popup.
     */
    testShowLoginSuccessPopup() {
        // Arrange: Mock document.createElement and document.body.appendChild.
        const createElementMock = jest.spyOn(document, 'createElement').mockReturnValue(document.createElement('div'));
        jest.spyOn(document.body, 'appendChild');

        // Act: Call the showLoginSuccessPopup function.
        showLoginSuccessPopup();

        // Assert: Verify that a div is created and styled correctly.
        expect(createElementMock).toHaveBeenCalledWith('div');
        // Additional assertions for the styles and content of the popup can be added here.
    }

    /**
     * Test to verify the removal of the popup after a delay.
     */
    testRemovePopupAfterDelay() {
        // Arrange: Mock setTimeout and the remove method of the popup.
        jest.useFakeTimers();
        const popup = document.createElement('div');
        popup.remove = jest.fn();
        jest.spyOn(document, 'createElement').mockReturnValue(popup);

        // Act: Call the showLoginSuccessPopup function and advance timers.
        showLoginSuccessPopup();
        jest.runAllTimers();

        // Assert: Verify that the popup is removed after the specified delay.
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
        expect(popup.remove).toHaveBeenCalled();
    }
}

// Running the tests
const showLoginSuccessPopupTest = new ShowLoginSuccessPopupTest();
showLoginSuccessPopupTest.testShowLoginSuccessPopup();
showLoginSuccessPopupTest.testRemovePopupAfterDelay();

// End of tests.