// src/Products.js
import React from 'react';

const products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Smartphone', price: 800 },
    { id: 3, name: 'Headphones', price: 150 }
];

function Products() {
    const buyProduct = (product) => {
        alert(`Purchased ${product.name} for $${product.price}`);
    };

    return (
        <div className="products">
            {products.map(product => (
                <div key={product.id} className="product">
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">${product.price}</div>
                    <button onClick={() => buyProduct(product)}>Buy</button>
                </div>
            ))}
        </div>
    );
}

export default Products;
