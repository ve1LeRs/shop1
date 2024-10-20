import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, addToCart, addToWishlist }) => {
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события
    addToCart(product);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события
    addToWishlist(product);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Цена: {product.price} ₽</p>
      <div className="buttons">
        <button onClick={handleAddToCart}>Добавить в корзину</button>
        <button onClick={handleAddToWishlist}>Добавить в избранное</button>
      </div>
    </div>
  );
};

export default ProductCard;
