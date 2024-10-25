// Vars
let userProfile = document.querySelector('#user-name-profile');
let emailProfile = document.querySelector('#email-profile');
let myProductsLengthBigProfile = document.querySelector('#my-products-length-profile');
let myProductsLengthProfile = document.querySelector('#my-products-length-profile span');
let userAvatarProfile = document.querySelector('.use-avatar');

// Local Storage
let getUserProfile = localStorage.getItem("userName");
let getPasswordProfile = localStorage.getItem("password");
let getEmailProfile = localStorage.getItem("email");
let getMyProductsProfile = JSON.parse(localStorage.getItem('myProducts'));

if (!(getUserProfile && getPasswordProfile))
    alert('Please log in or register first');
else {
    userProfile.innerHTML = getUserProfile;
    emailProfile.innerHTML = getEmailProfile;
    myProductsLengthProfile.innerHTML = getMyProductsProfile.length !== 0 ? getMyProductsProfile.length :
    myProductsLengthBigProfile.remove();
}