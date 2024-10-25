// Variables
let updatePicEdit = document.querySelector('#update-pic');
let updateNameEdit = document.querySelector('#edit-name');
let currentPasswordEdit = document.querySelector('#current-password');
let updatePasswordEdit = document.querySelector('#edit-password');
let updateBtnEdit = document.querySelector('#Edit-profile-btn');
let editProfileForm = document.querySelector('#edit-profile-form');
let userAfterLogInEdit = document.querySelector("#user");
let errorMessage = document.querySelector("#error-message");

let newPic;

// Local storage
let getUserEditProfile = localStorage.getItem("userName");
let getPasswordEditProfile = localStorage.getItem("password");

updateNameEdit.value = getUserEditProfile || '';  // Handle null case
currentPasswordEdit.value = getPasswordEditProfile || '';  // Handle null case

// Events
editProfileForm.addEventListener('submit', editProfileInformation);
updatePicEdit.addEventListener('change', updatePic);

// Functions
function editProfileInformation(e) {
    e.preventDefault();
    
    // Update username
    if (updateNameEdit.value.trim() !== "") {
        getUserEditProfile = updateNameEdit.value;
        localStorage.setItem('userName', getUserEditProfile);
        userAfterLogInEdit.innerHTML = getUserEditProfile;
    } else {
        alert('Please fill the username field');
        return;
    }

    const passwordInput = currentPasswordEdit.value;

    // Check if current password matches the stored password
    if (passwordInput !== getPasswordEditProfile) {
        errorMessage.style.display = "inline"; // Show error
        return;
    } else {
        errorMessage.style.display = "none"; // Hide error
        
        // Check if the new password is different and not empty
        if (updatePasswordEdit.value.trim() !== "" && updatePasswordEdit.value !== getPasswordEditProfile) {
            getPasswordEditProfile = updatePasswordEdit.value;
            localStorage.setItem("password", getPasswordEditProfile);
        } else if (updatePasswordEdit.value === getPasswordEditProfile) {
            alert('Please enter a different password');
            return;
        }
    }
}

function updatePic() {
    let file = this.files[0];
    let types = ["image/png", "image/jpeg", "image/webp"];
    
    if (types.indexOf(file.type) === -1) {
        alert('Error! Unsupported image type.');
        return;
    }

    if (file.size > 2 * 1024 * 1024) { // Image exceeds 2MB
        alert("Image exceeded 2MB");
        return;
    }

    getUpdatedImageBase64(file);
}

function getUpdatedImageBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        newPic = reader.result;
        console.log(newPic);
    }

    reader.onerror = function() {
        alert("ERROR!");
    }
}
