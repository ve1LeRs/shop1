import React, { useState } from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия корзины

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Кнопка открытия/закрытия корзины */}
      <div className="cart" onClick={toggleCart}>
        <p>Корзина:</p>
        <span>{cartItems.length} товаров</span>
      </div>

      {/* Содержимое корзины (отображается при открытии) */}
      {isOpen && (
        <div className="cart-details">
          <h3>Содержимое корзины</h3>
          {cartItems.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <img src={item.image} alt={item.name} width="50" />
                  {item.name} — {item.price} ₽, размер: {item.size}
                  <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
