// Register User

let email = document.querySelector(`#email`);
let userNameRegister = document.querySelector(`#userNameRegister`);
let passwordRegister = document.querySelector(`#passwordRegister`);
let submitRegister = document.querySelector('#signUp');

// Check Register
function register(e) {
    e.preventDefault();  // Correct the method name with a capital "D"
    if (userNameRegister.value.trim() === "" || passwordRegister.value === "" || email.value.trim() === "") {
        alert(`Please fill out all fields.`);
    } else {
        // Store user data in localStorage
        localStorage.setItem(`userName`, userNameRegister.value);
        localStorage.setItem(`email`, email.value);
        localStorage.setItem(`password`, passwordRegister.value);

        // Redirect to login.html after 1 second
        setTimeout(() => {
            window.location.href = "login.html";
        }, 500);
    }
}

// Pass the function reference, don't invoke it
submitRegister.addEventListener('click', register);
