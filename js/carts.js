// Vars
let productsInCart = localStorage.getItem('productsCart');
let objProductsInCart = JSON.parse(productsInCart); 
let productDom = document.querySelector('.products');
let noProducts = document.querySelector(`.no-products`);
let badgeDomCart = document.querySelector(".badge");

// Define the function to draw the products UI
function drawCartsProductsUI(products) {
    let productsUI = products.map((item) => {
        return `
        <div class="product-item">
            <div class="product-item-img">
                <img src="${item.imageUrl}" alt="${item.title}">
            </div>
            
            <div class="product-item-desc">
                <h2> ${item.title} </h2>
                <p> ${item.desc} </p>
                <span> Size: ${item.size} </span>
                <p> Quantity: ${item.qty} </p>
            </div>

            <div class="product-item-actions">
                <button class="remove-from-cart" onclick="removeItemFromCart(${item.id})"> Remove from cart </button>
            </div> 
        </div>
        `;
    });

    productDom.innerHTML = productsUI.join('');
}

// Call the function only if products exist in the cart
if (productsInCart && objProductsInCart.length > 0) {
    drawCartsProductsUI(objProductsInCart);
}

// Remove item from cart and Reset local storage
function removeItemFromCart(id) {
    let nonRemovedItems = objProductsInCart.filter(item => item.id !== id);
    localStorage.setItem('productsCart', JSON.stringify(nonRemovedItems));
    
    // Update the objProductsInCart with the filtered items
    objProductsInCart = nonRemovedItems;
    
    // If there are no products in cart
    
    if (objProductsInCart.length === 0) {
        noProducts.style.display = "block";
    }
    
    // Re-render the UI with the updated list of products
    drawCartsProductsUI(objProductsInCart);

    // Change num of products
    
    badgeDomCart.innerHTML = objProductsInCart.length;
}

removeItemFromCart();
