import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Цена: {product.price} ₽</p>
      <p>Размер: {product.size}</p>
      <p>{product.sizeChart}</p> {/* Размерная сетка */}
    </div>
  );
};

export default ProductDetail;
