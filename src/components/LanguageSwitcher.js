import React from 'react';
import './LanguageSwitcher.css';
const LanguageSwitcher = ({ language, setLanguage }) => {
  return (
    <div className="language-switcher">
      <button onClick={() => setLanguage('ru')} disabled={language === 'ru'}>Русский</button>
      <button onClick={() => setLanguage('en')} disabled={language === 'en'}>English</button>
    </div>
  );
};

export default LanguageSwitcher;
