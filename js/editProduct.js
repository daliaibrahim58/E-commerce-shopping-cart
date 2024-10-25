// Vars
let productFormEdit = document.querySelector("#edit-form");
let productNameEdit = document.querySelector("#edit-product-name");
let productDescEdit = document.querySelector("#edit-product-desc");
let productSizeEdit = document.querySelector("#edit-product-size");
let productBtnEdit = document.querySelector("#edit-product-btn");
let imageEdit = document.querySelector("#upload-image-file-edit"); // Keep this as DOM element
let productSizeValueEdit;
let productImageEdit;

// Local Storage
let editProductsLocalStorage = JSON.parse(localStorage.getItem('editProductID'));
let productsObjEdit = [];
try {
    productsObjEdit = JSON.parse(localStorage.getItem('products')) || [];
} catch (e) {
    console.error('Error parsing products from localStorage:', e);
    localStorage.setItem('products', JSON.stringify([]));
}

let getEditProduct = productsObjEdit.find(product => product.id === editProductsLocalStorage);
// print products before update
console.log("Product before update", getEditProduct);

if (getEditProduct) {
    productNameEdit.value = getEditProduct.title;
    productDescEdit.value = getEditProduct.desc;
    productSizeEdit.value = getEditProduct.size;
    getEditProduct.updated = "Yes";
    productImageEdit = getEditProduct.imgUrl; // Store image URL in a separate variable
}

// Events
productSizeEdit.addEventListener("change", getProductSizeValueEdit);
productFormEdit.addEventListener("submit", updateProduct); 
imageEdit.addEventListener("change", uploadimageEdit);

// Functions
function getProductSizeValueEdit(e) {
    productSizeValueEdit = e.target.value;
}

function updateProduct(e) {
    e.preventDefault(); // Prevent form submission

    // Update the product fields
    getEditProduct.title = productNameEdit.value;
    getEditProduct.desc = productDescEdit.value;
    getEditProduct.size = productSizeValueEdit || getEditProduct.size; // Update size if changed
    getEditProduct.imgUrl = productImageEdit; // Update image if changed
    
    // Print the updated product for debugging
    console.log("Product after update:", getEditProduct);

    // Save the updated array back to localStorage
    localStorage.setItem('products', JSON.stringify(productsObjEdit));

    // Optionally, redirect or show a success message
    alert("Product updated successfully!");
    setTimeout(() => {
        window.location = "index.html"; // Redirect back to the product list page
    }, 500);
}


// Upload image function
function uploadimageEdit() {
    let file = this.files[0];
    let types = ["image/png", "image/jpeg", "image/webp"];
    if (types.indexOf(file.type) === -1) {
        alert("Type not supported");
        return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
        alert("Image exceeded 2MB");
        return;
    }

    getImageBase64Edit(file);
}

function getImageBase64Edit(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
       productImageEdit = reader.result; // Store base64 image data here
    };

    reader.onerror = function() {
        alert("ERROR!");
    };
}


