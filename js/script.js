// Vars 
let productDom = document.querySelector(".products");
let selectedProductsContainer = document.querySelector(".selected_products");
let shoppingCart = document.querySelector(`#shopping_cart`);
let selectedItemsItemName = document.querySelector(".item-name");
let inputDom = document.querySelector(`#search`);
let badgeDomScript = document.querySelector(".badge");
let selectedItems = document.querySelector(".selected-items");
let cartInfoDom = document.querySelector(".cart_info");
let createProductIcon = document.querySelector(".create-product-icon");
let sizeFilter = document.querySelector("#size-filter");

// Local Storage
let userScript = localStorage.getItem('userName');
let passwordScript = localStorage.getItem('password');
let favProductsScript = JSON.parse(localStorage.getItem('favItems')) || [];
let myProductsScript = JSON.parse(localStorage.getItem('myProducts')) || [];
let edittedProductScript = localStorage.getItem('editProductID') || null;


let productsObjScript = [];
try {
    productsObjScript = JSON.parse(localStorage.getItem('products')) || [];
} catch (e) {
    console.error('Error parsing products from localStorage:', e);
    localStorage.setItem('products', JSON.stringify([]));
}

let addedItemScript;
try {
    addedItemScript = localStorage.getItem(`productsCart`) ? JSON.parse(localStorage.getItem(`productsCart`)) : [];
} catch (e) {
    addedItemScript = [];
}


// Products Info

function drawProductsUI(products) {
    let productsUI = products.map((item) => {
        let isOwner = item.IsMe && typeof item.IsMe === 'string' && item.IsMe.toLowerCase() === 'yes'; // Condition stored in a variable
        
        return `
        <div class="product-item" style="border: ${isOwner ? '2px solid #555' : 'none'}">

            <div class="product-item-img">
                <img src="${item.imageUrl}" alt="${item.title}">
            </div>
            
            <div class="product-item-desc">
                <a href="#" onclick='saveItemData(${item.id})'> ${item.title} </a>
                <p> ${item.desc} </p>
                <span> Size: ${item.size} </span>
                <button class="edit-product" onclick="editProduct(${item.id})" style="display: ${isOwner ? 'block' : 'none'};">
                Edit Product</button>
                <button class="delete-product" onclick="deleteProduct(${item.id})" style="display: block;">
                Delete Product</button>
            </div>

            <div class="product-item-actions">
                <button class="add-to-cart" onclick="checkLogInUser(${item.id})"> Add To Cart </button>
                <i class="fa fa-heart" aria-hidden="true" onclick="addToFav(${item.id}, this)" id="fav-${item.id}"></i>
            </div> 
        </div>
        `;
    });

    productDom.innerHTML = productsUI.join('');
}

// Main Products

drawProductsUI(productsObjScript);

function addToSelectedItemsDiv(ID) {
    let selectedItemDiv = productsObjScript.find((item) => item.id == ID);

    if (!selectedItemDiv) {
        console.error(`Item with ID ${ID} not found`);
        return;  // Exit the function early if no item is found
    }
    
    let isItemInCart = addedItemScript.some(item => item.id == selectedItemDiv.id);
    
    if (!isItemInCart) {
        selectedItemDiv.qty = 1; // Initialize quantity if the item is new
        addedItemScript = [...addedItemScript, selectedItemDiv];
    } else {
        addedItemScript.forEach(item => {
            if (item.id === ID) {
                item.qty += 1; // Increment quantity if the item is already in the cart
            }
        });
    }

    // Update localStorage after modifying the item quantity
    localStorage.setItem('productsCart', JSON.stringify(addedItemScript));

    // Update the UI to display the items in the cart
    displayCartItems();
    
    // Update the badge with the total number of items in the cart
    badgeDomScript.innerHTML = addedItemScript.length;
}

// Function to display the items in the cart
function displayCartItems() {
    // Clean the addedItemScript array to remove any null/invalid items
    addedItemScript = addedItemScript.filter(item => item !== null && item.title); // Remove null/invalid items

    // Clear the cart display area
    selectedItemsItemName.innerHTML = "";

    // Display the items and their quantities
    addedItemScript.forEach(element => {
        selectedItemsItemName.innerHTML += `<p>${element.title}  ${element.qty}</p>`;
    });
}

// Call this function when the page loads to ensure items are displayed on reload
window.onload = function() {
    // Load the cart items from localStorage if they exist
    const storedCart = localStorage.getItem('productsCart');
    if (storedCart) {
        addedItemScript = JSON.parse(storedCart);

        // Clean up invalid/null entries in the addedItemScript array
        addedItemScript = addedItemScript.filter(item => item !== null && item.title); // Remove null/invalid items
        
        // Save the cleaned array back to localStorage
        localStorage.setItem('productsCart', JSON.stringify(addedItemScript));
    }
    
    // Display the items in the cart on page load
    displayCartItems();
    
    // Update the badge with the total number of items in the cart on page load
    badgeDomScript.innerHTML = addedItemScript.length;

    // Check favorites on page load
    checkFavItemsOnLoad();
}

// Open cart menu

function openCartMenu() {
    // Display the selected items div if currentValue is not zero
    if (addedItemScript.length > 0) {
        selectedItems.style.display = selectedItems.style.display === "block" ? "none" : "block";
    }
}

// Attach the event listener to display selected items on click
cartInfoDom.addEventListener("click", openCartMenu);

// Check User
function checkLogInUser(id) {
    if (localStorage.getItem("userName")) {
        addToSelectedItemsDiv(id);  // Correct function call
    } else {
        window.location = "login.html"; 
    }
}

// saveItemData function

function saveItemData(id) {
    localStorage.setItem('productDetailsID', id);
    window.location = `cartDtails.html`;
}

// Search function

inputDom.addEventListener('keyup', e => {
    
    if (e.target.value.trim() !== "")
        searchProducts(e.target.value, productsObjScript);
    if (e.target.value.trim() === "")
        drawProductsUI(productsObjScript);
});

function searchProducts(title, searchArray) {
    let searchedItemArr = searchArray.filter(item => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
    drawProductsUI(searchedItemArr);
}

// Add product to fav in local storage
// Function to add or remove an item from favorites
function addToFav(ID, element) {
    let favItem = productsObjScript.find(item => item.id === ID);
    
    // Retrieve existing fav items from localStorage
    let allFavitems = JSON.parse(localStorage.getItem('favItems')) || [];

    // Check if item is already in favorites
    if (!allFavitems.some(item => item.id === ID)) {
        // If not in favorites, add it
        allFavitems = [...allFavitems, favItem];
        element.style.color = 'red'; // Change color of the clicked element
    } else {
        // If already in favorites, remove it
        allFavitems = allFavitems.filter(item => item.id !== ID);
        element.style.color = 'black'; // Reset color to default
    }

    // Update localStorage with the modified array (stringify before saving)
    localStorage.setItem('favItems', JSON.stringify(allFavitems));
}

// Function to check favorites on page load and update colors
function checkFavItemsOnLoad() {
    let allFavitems = [];
    
    try {
        // Safely parse the localStorage data
        allFavitems = JSON.parse(localStorage.getItem('favItems')) || [];
    } catch (e) {
        console.error('Error parsing favItems from localStorage:', e);
        localStorage.setItem('favItems', JSON.stringify([])); // Reset invalid data
    }
    
    // Loop through all favorite items
    allFavitems.forEach(favItem => {
        let favElement = document.querySelector(`#fav-${favItem.id}`);
        if (favElement) {
            favElement.style.color = 'red'; // Set the color to red if it's a favorite
        }
    });
}

// Create Product

createProductIcon.addEventListener('click', function() {
    if (!(userScript && passwordScript))
        alert("Please login or register first");
    else
        window.location = "createProduct.html";
})


// Filter Products By Size

sizeFilter.addEventListener('change', getFilteredProductsBySize);

function getFilteredProductsBySize(e) {
    let filteredSize = e.target.value.toLowerCase();  // Convert filteredSize to lowercase

    if (filteredSize === "all") {
        drawProductsUI(productsObjScript);
    } else {
        // Filter products by size and convert both product size and filteredSize to lowercase for comparison
        let filteredProducts = productsObjScript.filter(product => product.size.toLowerCase() === filteredSize);
        // productsObjScript = filteredProducts;
        drawProductsUI(filteredProducts);
    }
}

// Edit product
function editProduct(id) {
    localStorage.setItem('editProductID', id);
    window.location = "editProduct.html";
}

// Delete product from myProducts
function deleteProduct(ID) {
    // Filter out the product to delete
    let unDeletedProducts = productsObjScript.filter(Product => Product.id !== ID);
    let unDeletedFavProducts = favProductsScript.filter(Product => Product.id !== ID);
    let unDeletedMyProducts = myProductsScript.filter(Product => Product.id !== ID);
    let unDeletedCartProducts = addedItemScript.filter(Product => Product.id !== ID);
    let unDeletedEdittedProduct = edittedProductScript === ID ? null : edittedProductScript;
    
    // Update fav items
    favProductsScript = unDeletedFavProducts;
    localStorage.setItem('favItems', JSON.stringify(favProductsScript));

    // Update my-products
    myProductsScript = unDeletedMyProducts;
    localStorage.setItem('myProducts', JSON.stringify(myProductsScript));

    // Update productsCart
    addedItemScript = unDeletedCartProducts;
    localStorage.setItem('productsCart', JSON.stringify(addedItemScript));

    // Update edit products
    edittedProductScript = unDeletedEdittedProduct;
    localStorage.setItem('editProductID', edittedProductScript);
    
    // Update localStorage with the new array
    productsObjScript = unDeletedProducts;
    localStorage.setItem('products', JSON.stringify(productsObjScript));

    
    // Update the UI by redrawing the product list
    drawProductsUI(productsObjScript);
}
