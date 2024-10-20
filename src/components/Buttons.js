import React from 'react';
import { Link } from 'react-router-dom';
import './Buttons.css'; // Импорт стилей для кнопок

const Buttons = () => {
  return (
    <div className="buttons-container">
      <Link to="/profile" className="button">Профиль пользователя</Link>
      <Link to="/change-password" className="button">Изменить пароль</Link>
      <Link to="/wishlist" className="button">Список желаемого</Link>
      <Link to="/reviews" className="button">Отзывы о товарах</Link>
      <Link to="/store-info" className="button">Информация о магазине</Link>
    </div>
  );
};

export default Buttons;
