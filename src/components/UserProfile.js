import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css';
const UserProfile = ({ userProfile, updateUserProfile }) => {
  const [name, setName] = useState(userProfile.name || '');
  const [email, setEmail] = useState(userProfile.email || '');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    updateUserProfile({ name, email });
    alert('Профиль обновлен');
  };

  const handleChangePassword = () => {
    alert('Пароль успешно изменён');
  };

  return (
    <div className="user-profile">
      <h2>Профиль пользователя</h2>
      <form>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Новый пароль" />
        <button type="button" onClick={handleSave}>Сохранить профиль</button>
        <button type="button" onClick={handleChangePassword}>Изменить пароль</button>
      </form>
    </div>
  );
};

export default UserProfile;
