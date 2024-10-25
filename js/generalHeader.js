let logOut = document.querySelector("#logOut");
let links = document.querySelector("#links");
let userInfo = document.querySelector("#user_info");
let userAfterLogIn = document.querySelector("#user");
let badgeDomGeneral = document.querySelector(".badge");
let selectedItemName = document.querySelector(".item-name");
let logOutGeneral = document.querySelector("#logOut");

// Local Storage
let addedItemGeneral;
try {
    addedItemGeneral = localStorage.getItem('productsCart') ? JSON.parse(localStorage.getItem('productsCart')) : [];
} catch (e) {
}

let getUserGeneral = localStorage.getItem('userName');
let getPasswordGeneral = localStorage.getItem('password');

// Nav Section
if (getPasswordGeneral && getUserGeneral) {
    links.style.display = `none`;
    userInfo.style.display = `flex`;
    userAfterLogIn.innerHTML = getUserGeneral;
}

// Things should exist by default
(function def() {
    // Put in selected-items div
    badgeDomGeneral.innerHTML = addedItemGeneral.length;
    
    // Check if added items exist
    if (addedItemGeneral.length > 0) {
        addedItemGeneral.map(item => {
            selectedItemName.innerHTML += `<p>${item}</p>`
        });
    }
})();

window.onload = function() {
    userAfterLogIn.innerHTML = getUserGeneral;
}

// Log out 
logOut.addEventListener("click", () => {
    // Clear user data from local storage
    localStorage.removeItem('userName');
    localStorage.removeItem('password');
    localStorage.removeItem('productsCart');
    localStorage.removeItem('myProducts');
    localStorage.removeItem('favItems');
    localStorage.removeItem('productDetailsID');
    localStorage.removeItem('editProductID');

    // Reset user interface
    userInfo.style.display = `none`;
    links.style.display = `flex`;
    userAfterLogIn.innerHTML = "";
    badgeDomGeneral.innerHTML = 0;
    selectedItemName.innerHTML = "";

    // Optionally, redirect to login page or home page
    // window.location.href = "login.html";  // Uncomment if you want to redirect to login page
});
