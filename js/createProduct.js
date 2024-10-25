// Vars
let productNameCreate = document.querySelector("#created-product-name");
let productDescCreate = document.querySelector("#created-product-desc");
let productSizeCreate = document.querySelector("#created-product-size");
let productBtnCreate = document.querySelector("#created-product-btn");
let productFormCreate = document.querySelector("#create-form");
let imageCreate = document.querySelector("#upload-image-file-create");
let productSizeValueCreate;
let productImageCreate;
// Events
productSizeCreate.addEventListener("change", getProductSizeValueCreate);
productFormCreate.addEventListener("submit", createProductFun);
imageCreate.addEventListener("change", uploadimage);
// Functions
function getProductSizeValueCreate(e) {
    productSizeValueCreate = e.target.value;
}

// Create product and save it in database
function createProductFun(e) {
    e.preventDefault();
    
    // Get all products from localStorage or initialize an empty array if none exist
    let allProductsInLocalStorage = JSON.parse(localStorage.getItem('products')) || [];
    
    let nameValueCreate = productNameCreate.value;
    let descValueCreate = productDescCreate.value;
    
    if (nameValueCreate && descValueCreate) {
        // Check if a product with the same title already exists
    let productExists = allProductsInLocalStorage.some(product => product.title === nameValueCreate);
    let productObjExists = allProductsInLocalStorage.find(product => product.title === nameValueCreate);
    
    if (productExists) {
        if (productSizeValueCreate === productObjExists.size)
            alert("Product already exists!");
    } else {
        let obj = {
            id: allProductsInLocalStorage.length + 1,
            title: nameValueCreate,
            desc: descValueCreate,
            size: productSizeValueCreate,
            imageUrl: productImageCreate,
            qty: 1,
            IsMe: "Yes",
            updated: "No",
        };
        
        // Add new product to the array and update localStorage
        allProductsInLocalStorage = [...allProductsInLocalStorage, obj];
        localStorage.setItem('products', JSON.stringify(allProductsInLocalStorage));
        setTimeout(() => {
            window.location = "index.html";
        }, 500);
    
        alert("Product added successfully!");
    }
    productNameCreate.value = "";
    productDescCreate.value = "";
    productSizeCreate.value = "";
    imageCreate.value = "";
    } else {
        alert("Enter data");
    }
}

// Upload image function

function uploadimage() {
    let file = this.files[0];
    let types = ["image/png", "image/jpeg", "image/webp"];
    if (types.indexOf(file.type) === -1) {
        alert("Type not supported");
        return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
        alert("Image exceeded 2MG");
        return;
    }

    getImageBase64(file);
}

function getImageBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
       productImageCreate = reader.result;
       console.log(reader.result);
    };

    reader.onerror = function() {
        alert("ERROR !");
    }
}