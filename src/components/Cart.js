import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, removeFromCart, onOrder }) => {
  return (
    <div className="cart">
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>Цена: {item.price} ₽</p>
              <p>Количество: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Удалить</button>
            </div>
          </div>
        ))
      )}
      <button onClick={onOrder}>Оформить заказ</button>
    </div>
  );
};

export default Cart;
