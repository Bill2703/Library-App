/**
 * Test suite for DisplaySelectedBook functionality.
 * This suite tests if the displaySelectedBook function correctly displays the title of the selected book.
 */
describe("DisplaySelectedBook Functionality", () => {
    let nameSpace;
  
    beforeEach(() => {
      // Create a mock div element to simulate the part of the DOM where the selected book's title will be displayed.
      nameSpace = document.createElement("div");
      nameSpace.id = "additionalInfo";
      document.body.appendChild(nameSpace);
    });
  
    afterEach(() => {
      // Clean up the DOM and localStorage after each test to ensure test isolation.
      document.body.removeChild(nameSpace);
      localStorage.clear();
    });
  
    test("should display the selected book title", () => {
      // Arrange: Set up the selected book in localStorage.
      const selectedBook = { title: "Book Title" };
      localStorage.setItem("selectedBook", JSON.stringify(selectedBook));
  
      // Act: Call the function under test.
      displaySelectedBook();
  
      // Assert: Check if the function correctly displays the book's title.
      expect(nameSpace.textContent).toBe(selectedBook.title);
    });
  });
  
  /**
   * Test suite for HandleBookNowClick functionality.
   * This suite tests the behavior of the handleBookNowClick function, particularly its interactions with other functions.
   */
  describe("HandleBookNowClick Functionality", () => {
    let bookingDateInput, bookingTimeInput, bookNowLink;
  
    beforeEach(() => {
      // Set up mock DOM elements to simulate the booking input fields and the 'Book Now' link.
      bookingDateInput = document.createElement("input");
      bookingTimeInput = document.createElement("input");
      bookNowLink = document.createElement("a");
      bookingDateInput.id = "date";
      bookingTimeInput.id = "time";
      bookNowLink.id = "bookNow";
      document.body.append(bookingDateInput, bookingTimeInput, bookNowLink);
  
      // Mock functions that are called within handleBookNowClick to isolate the test.
      jest.spyOn(window, "updateStock").mockImplementation(() => {});
      jest.spyOn(window, "sendBookingConfirmation").mockImplementation(() => {});
    });
  
    afterEach(() => {
      // Restore mocked functions and remove the mock elements from the DOM after each test.
      jest.restoreAllMocks();
      document.body.removeChild(bookingDateInput);
      document.body.removeChild(bookingTimeInput);
      document.body.removeChild(bookNowLink);
    });
  
    test("should call updateStock and sendBookingConfirmation on valid input", () => {
      // Arrange: Set up a selected book in localStorage.
      const selectedBook = { title: "Book Title" };
      localStorage.setItem("selectedBook", JSON.stringify(selectedBook));
  
      // Act: Trigger the handleBookNowClick function with a click event.
      handleBookNowClick(new Event("click"));
  
      // Assert: Verify if the updateStock and sendBookingConfirmation functions were called.
      expect(window.updateStock).toHaveBeenCalled();
      expect(window.sendBookingConfirmation).toHaveBeenCalled();
    });
  });
  
  /**
   * Test suite for HandleLogout functionality.
   * This suite tests whether the handleLogout function correctly clears data from localStorage.
   */
  describe("HandleLogout Functionality", () => {
    beforeEach(() => {
      // Set up test data in localStorage.
      localStorage.setItem("token", "testToken");
      localStorage.setItem("selectedBook", "testSelectedBook");
    });
  
    afterEach(() => {
      // Clear localStorage after each test.
      localStorage.clear();
    });
  
    test("should clear localStorage on logout", () => {
      // Act: Trigger the logout functionality.
      handleLogout();
  
      // Assert: Verify that the localStorage has been cleared.
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("selectedBook")).toBeNull();
    });
  });
  
  /**
   * Test suite for UpdateStock functionality.
   * This suite tests the updateStock function, both in successful scenarios and in handling failures.
   */
  describe("UpdateStock Functionality", () => {
    beforeEach(() => {
      // Mock the fetch function globally to intercept network requests.
      jest.spyOn(window, "fetch");
    });
  
    afterEach(() => {
      // Restore the original fetch function after each test.
      jest.restoreAllMocks();
    });
  
    test("should send correct request for stock update", async () => {
      // Arrange: Set up a book object and mock a successful fetch response.
      const book = { title: "Book Title", stock: 5 };
      window.fetch.mockResolvedValue({ ok: true });
  
      // Act: Call the updateStock function with the mock book.
      await updateStock(book);
  
      // Assert: Verify that the fetch function was called with the correct parameters.
      expect(window.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object)
      );
      // Additional assertions for request details can be added here.
    });
  
    test("should handle failure in stock update", async () => {
      // Arrange: Mock a failing fetch response.
      window.fetch.mockResolvedValue({ ok: false });
  
      // Act & Assert: Call the updateStock function and expect it to throw an error.
      await expect(
        updateStock({ title: "Book Title", stock: 5 })
      ).rejects.toThrow("Failed to update stock");
    });
  });
  