// Vars
let favProductsDom = document.querySelector('.products');
let noFavProductsDom = document.querySelector(".no-products");
// Local Storage
let favItems = JSON.parse(localStorage.getItem('favItems')) || [];
let productsCartFav;
let productsFav = JSON.parse(localStorage.getItem('products'));
try{
    productsCartFav = localStorage.getItem('productsCart') ? JSON.parse(localStorage.getItem('productsCart')) : [];
} catch(e) {
    // productsCartFav = [];
}

// Set fav products
function favProductsUI(items = favItems) {
    let favItemsSet = items.map(item => {
        return `<div class="product-item">
            <div class="product-item-img">
                <img src="${item.imageUrl}" alt="${item.title}">
            </div>
            
            <div class="product-item-desc">
                <a href="#" onclick='saveItemData(${item.id})'> ${item.title} </a>
                <p> This is a good product. </p>
                <span> Size: ${item.size} </span>
            </div>

            <div class="product-item-actions">
                <button class="add-to-cart" onclick="checkLogInUserFav(${item.id})"> Add To Cart </button>
                <button class="remove-from-fav" onclick="removedFavItem(${item.id})"> Remove from favorites </button>
            </div> 
        </div>
        `;
    });

    favProductsDom.innerHTML = favItemsSet.join('');
}

// Initial call to set fav products on page load
favProductsUI();

// Remove item from fav
function removedFavItem(ID) {
    // Filter out the item by ID
    favItems = favItems.filter(item => item.id !== ID);

    // Update localStorage
    localStorage.setItem('favItems', JSON.stringify(favItems));

    // Re-render the favorites list
    favProductsUI();
    
    if (favItems.length === 0) {
        noFavProductsDom.style.display = "block";
    }
}

removedFavItem();

// Added fav items to cart
function addToSelectedItemsDivFav(ID) {
    let isFavInProductsCart = productsCartFav.some(item => item.id === ID);
    if (!isFavInProductsCart) {
        // Find the product and add it to the cart with an initial quantity of 1
        let addFavProductToCart = productsFav.find(item => item.id === ID);
        addFavProductToCart.qty = 1; // Initialize quantity if not already set
        productsCartFav = [...productsCartFav, addFavProductToCart];
    } else {
        // Increment the quantity of the product directly in productsCartFav
        productsCartFav = productsCartFav.map(item => {
            if (item.id === ID) {
                item.qty += 1;
            }
            return item;
        });
    }

    localStorage.setItem('productsCart', JSON.stringify(productsCartFav));
}
// Check User
function checkLogInUserFav(id) {
    if (localStorage.getItem("userName")) {
        addToSelectedItemsDivFav(id);  // Correct function call
    } else {
        window.location = "login.html"; 
    }
}