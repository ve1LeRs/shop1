import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p className="price" style={{ fontWeight: 'bold', color: '#ff5722', fontSize: '1.5rem' }}>{product.price} ₽</p>
      </Link>
      <button onClick={() => addToCart(product)}>Добавить в корзину</button>
    </div>
  );
};

export default ProductCard;
