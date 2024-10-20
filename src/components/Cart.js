import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, removeFromCart, updateCartItemQuantity }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-details">
      <h3>Содержимое корзины</h3>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="50" />
              <div className="item-details">
                <span>{item.name} — {item.price} ₽, размер: {item.size}</span>
                <div className="quantity-controls">
                  <button onClick={() => updateCartItemQuantity(item.id, -1)} className="quantity-button">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartItemQuantity(item.id, 1)} className="quantity-button">+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-button">Удалить</button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="total">
          <h4>Итоговая стоимость: {calculateTotal()} ₽</h4>
        </div>
      )}
    </div>
  );
};

export default Cart;
