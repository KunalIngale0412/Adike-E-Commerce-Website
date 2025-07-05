document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Hardcoded credentials for login validation
    var validUsername = "admin";
    var validPassword = "password123";

    // Check credentials
    if (username === validUsername && password === validPassword) {
        window.location.href = "index.html"; // Redirect to main page
    } else {
        alert("Invalid username or password. Please try again.");
    }
});