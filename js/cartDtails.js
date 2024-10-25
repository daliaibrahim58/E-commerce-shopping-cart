// vars

let productDetailsCartDetailsDom = document.querySelector('.product-details');
let productsObjCartDtails = JSON.parse(localStorage.getItem('products'));
let productDetailsID = localStorage.getItem('productDetailsID');
let productDetailsItemObj = productsObjCartDtails.find(item => item.id == productDetailsID);

function itemDetailsUI(item) {
    let itemDetailsHTML = `
        <div class="item-details">
            <img src="${item.imageUrl}" alt="img-details">
            <h2>${item.title}</h2>
            <p>ID: ${item.id}</p>
            <span>Size: ${item.size}</span><br>
            <span>Quantity: ${item.qty}</span>
        </div> <!-- /item-details -->
    `;
    productDetailsCartDetailsDom.innerHTML = itemDetailsHTML;
}

itemDetailsUI(productDetailsItemObj);
