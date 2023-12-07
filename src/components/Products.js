import React from 'react';

const products = [
    { id: 1, name: 'Laptop', price: 1000, image: 'logo192.png' },
    { id: 2, name: 'Smartphone', price: 800, image: 'logo512.png' },
    { id: 3, name: 'Smartphone', price: 800, image: 'logo192.png' },
    { id: 4, name: 'Smartphone', price: 800, image: 'logo512.png' },
    
];

function Products() {
    const buyProduct = (product) => {
        alert(`Purchased ${product.name} for $${product.price}`);
    }

    return (
        <div className="products">
            {products.map(product => (
                <div key={product.id} className="product" style={{
                  }}>
                    <img src={product.image} alt={product.name} /> 
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">${product.price}</div>
                    <button onClick={() => buyProduct(product)}>Buy</button>
                </div>
            ))}
        </div>
    );
}

export default Products;
