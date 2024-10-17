import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все'); // Состояние для выбранной категории
  const [cartItems, setCartItems] = useState([]);

  const products = [
    { id: 1, name: 'Футболка', price: 1500, size: 'M', image: `${process.env.PUBLIC_URL}/img/shirt.jpg`, category: 'Одежда' },
    { id: 2, name: 'Кроссовки', price: 5000, size: '42', image: `${process.env.PUBLIC_URL}/img/sneakers.jpg`, category: 'Обувь' },
  ];

  // Фильтрация товаров по категории
  const filteredProducts = selectedCategory === 'Все' ? products : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <h1>Магазин одежды и обуви</h1>

      {/* Кнопки для выбора категорий */}
      <div className="category-buttons">
        <button onClick={() => setSelectedCategory('Все')}>Все</button>
        <button onClick={() => setSelectedCategory('Одежда')}>Одежда</button>
        <button onClick={() => setSelectedCategory('Обувь')}>Обувь</button>
      </div>

      {/* Отображение товаров по выбранной категории */}
      <div className="container">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {/* Компонент корзины */}
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default App;