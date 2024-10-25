// Vars
let myProductsDom = document.querySelector('.my-products');
let myProductsFilterSize = document.querySelector('#my-product-size-filter');

// Loccal storage

let favItemsMy = JSON.parse(localStorage.getItem('favItems')) || [];
let productsObjMy = [];
try {
    productsObjMy = JSON.parse(localStorage.getItem('products')) || [];
} catch (e) {
    console.error('Error parsing products from localStorage:', e);
    localStorage.setItem('products', JSON.stringify([]));
}

// Initialize myProductsobj with data from localStorage or an empty array
let myProductsobj = JSON.parse(localStorage.getItem('myProducts')) || [];

// Function to draw products UI
function drawMyProductsUI(products) {
    let myProductsUI = products.map((item) => {
        return `
        <div class="product-item" style="border: 2px solid #555;">
            <div class="product-item-img">
                <img src="${item.imageUrl}" alt="${item.title}">
            </div>
            <div class="product-item-desc">
                <a href="#" onclick='saveItemData(${item.id})'> ${item.title} </a>
                <p> ${item.desc} </p>
                <span> Size: ${item.size} </span>
                <button class="edit-product" onclick="editProduct(${item.id})" style="display: block;">
                Edit Product</button>
                <button class="delete-product" onclick="deleteMyProduct(${item.id})" style="display: block;">
                Delete Product</button>
            </div>
            <div class="product-item-actions">
                <i class="fa fa-heart" aria-hidden="true" onclick="addMyProductToFav(${item.id}, this)" id="fav-${item.id}"></i>
            </div> 
        </div>
        `;
    });

    myProductsDom.innerHTML = myProductsUI.join('');
}

// Load products on page load
drawMyProductsUI(myProductsobj);

// Event listener for filtering products by size
myProductsFilterSize.addEventListener('change', filterMyProductsBySize);

// Function to filter products by size
function filterMyProductsBySize(e) {
    let selectedMyProductSize = e.target.value;
    if (selectedMyProductSize.toLowerCase() === 'all') {
        drawMyProductsUI(myProductsobj);
    } else {
        let filteredmyProducts = myProductsobj.filter(myProduct => myProduct.size === selectedMyProductSize);
        drawMyProductsUI(filteredmyProducts);
    }
}

// Function to delete a product from myProducts
function deleteMyProduct(ID) {
    // Filter out the product to delete, ensuring that myProduct is valid before accessing its id
    let unDeletedMyProducts = myProductsobj.filter(myProduct => myProduct && myProduct.id !== ID);

    // Update localStorage with the new array
    localStorage.setItem('myProducts', JSON.stringify(unDeletedMyProducts));

    // Reload the products from localStorage after deletion
    myProductsobj = JSON.parse(localStorage.getItem('myProducts')) || [];

    // Update the UI by redrawing the product list
    drawMyProductsUI(myProductsobj);

    // Filter out the product from the main products array, with the same null check
    let unDeletedProductsMy = productsObjMy.filter(myProduct => myProduct && myProduct.id !== ID);
    productsObjMy = unDeletedProductsMy;
    localStorage.setItem('products', JSON.stringify(productsObjMy));
}

(function checkMyFavItems() {
    myProductsobj.forEach(myProduct => {
        let isMyProductInFav = favItemsMy.some(favItemMy => favItemMy && favItemMy.id === myProduct.id);
        let favItemIconMy = document.querySelector(`#fav-${myProduct.id}`);
        if (favItemIconMy) {  // Ensure the icon element exists
            favItemIconMy.style.color = isMyProductInFav ? 'red' : 'black'; // Use black or default color for 'not-favored'
        }
    });
})();

// Add or delete fav-item from favorites

function addMyProductToFav(ID, element) {
    let findMyitemInFavItems = favItemsMy.find(favItemMy => favItemMy && favItemMy.id === ID);

    if (findMyitemInFavItems) {
        // If the item is found in favorites, remove it
        let unDeletedFavitemsMy = favItemsMy.filter(favItemMy => favItemMy && favItemMy.id !== ID);
        favItemsMy = unDeletedFavitemsMy;
        element.style.color = 'black'; // Reset icon color to default
    } else {
        // If the item is not in favorites, add it
        let myProduct = myProductsobj.find(myProduct => myProduct.id === ID); // Find the product to add
        
        // Add a null check for myProduct
        if (!myProduct) {
            console.error(`Product with ID ${ID} not found.`);
            return; // Stop the function if the product is not found
        }

        favItemsMy.push(myProduct);  // Add to favItems array
        element.style.color = 'red'; // Change icon color to red
    }

    // Update localStorage with the modified favorites array
    localStorage.setItem('favItems', JSON.stringify(favItemsMy));
}


