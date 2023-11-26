const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    localStorage.removeItem("token")
});
