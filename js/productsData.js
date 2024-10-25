// Initial products array
let products = [
    {
        id: 1,
        title: `Glasses item`,
        desc: `This is a good product.`,
        size: `large`,
        imageUrl: `images/glasses.jpg`,
        qty: 1,
        IsMe: "No",
        upDate: "No",
    },
    {
        id: 2,
        title: `Laptop item`,
        desc: `This is a good product.`,
        size: `large`,
        imageUrl: `images/laptop.jpg`, // Fixed typo from 'laotop'
        qty: 1,
        IsMe: "No",
    },
    {
        id: 3,
        title: `Watches item`,
        desc: `This is a good product.`,
        size: `large`,
        imageUrl: `images/watches.jpg`,
        qty: 1,
        IsMe: "No",
    },
    {
        id: 4,
        title: `Headphones item`,
        desc: `This is a good product.`,
        size: `large`,
        imageUrl: `images/bluetoothheadphones-2048px-0876.jpg`,
        qty: 1,
        IsMe: "No",
    }
];

// Retrieve products from localStorage or use the initial products array if localStorage is empty
let productsInLocalPD = JSON.parse(localStorage.getItem('products')) || products;

// Debugging: Log the products retrieved from localStorage
console.log('Products in Local Storage:', productsInLocalPD);

// Filter out products from the initial products array that already exist in localStorage (based on id)
let filteredProductsInLocalPD = productsInLocalPD.filter(productLocal => {
    return !products.some(product => product.id === productLocal.id);
});

// Set created products only in local storage
localStorage.setItem('myProducts', JSON.stringify(filteredProductsInLocalPD));

// Debugging: Log the filtered products
console.log('Filtered Products (not in Local Storage):', filteredProductsInLocalPD);

// Correct merging: Spread the filteredProductsInLocalPD array into productsInLocalPD
if (filteredProductsInLocalPD.length !== 0) {
    productsInLocalPD = [...products, ...filteredProductsInLocalPD];
}

// Debugging: Log the merged products array
console.log('Merged Products Array:', productsInLocalPD);

// Save the updated list of products back to localStorage
localStorage.setItem('products', JSON.stringify(productsInLocalPD));

// Debugging: Log to confirm localStorage has been updated
console.log('Updated Local Storage:', JSON.parse(localStorage.getItem('products')));

