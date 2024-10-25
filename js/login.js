// Vars
    let userNameLogIn = document.querySelector("#userNameLogIn");
    let passwordLogIn = document.querySelector("#passwordLogIn");
    let loginBtn = document.querySelector("#signIn");
    

    let getUserLogin = localStorage.getItem("userName");
    let getPassowrdLogin = localStorage.getItem("password");

// Check Login
    function login(e) {

        e.preventDefault();

        if (getUserLogin && getPassowrdLogin) {

            if (getUserLogin.trim() === userNameLogIn.value.trim() && getPassowrdLogin === passwordLogIn.value) {

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 500);
            } else {
                console.log("Username or password is incorrect!");
            }
        } else {
            console.log("No user stored in localStorage.");
        }
    }

    loginBtn.addEventListener("click", login);



