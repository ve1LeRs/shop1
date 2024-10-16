import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} ₽</p>
      <p>Размер: {product.size}</p>
      <button onClick={() => addToCart(product)}>Добавить в корзину</button>
    </div>
  );
};

export default ProductCard;
