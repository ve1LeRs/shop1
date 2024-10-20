import React, { useState } from 'react';
import './ChangePassword.css'; // Подключи CSS для стилей

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика для изменения пароля
    alert('Пароль изменен успешно!');
  };

  return (
    <div className="change-password">
      <h2>Изменить пароль</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Старый пароль:
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </label>
        <label>
          Новый пароль:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <button type="submit">Изменить пароль</button>
      </form>
    </div>
  );
};

export default ChangePassword;
