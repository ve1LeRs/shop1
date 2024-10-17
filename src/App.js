import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: 'Футболка', price: 1500, image: `${process.env.PUBLIC_URL}/img/shirt.jpg`, category: 'Одежда', description: 'Качественная футболка из хлопка', size: 'M', sizeChart: 'Размерная сетка футболок' },
    { id: 2, name: 'Кроссовки', price: 5000, image: `${process.env.PUBLIC_URL}/img/sneakers.jpg`, category: 'Обувь', description: 'Удобные кроссовки для бега', size: '42', sizeChart: 'Размерная сетка кроссовок' },
    { id: 3, name: 'Кроссовки 2', price: 10000, image: `${process.env.PUBLIC_URL}/img/sneaker.jpg`, category: 'Обувь', description: 'Стильные кроссовки для города', size: '43', sizeChart: 'Размерная сетка кроссовок' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(cartItems.map(item =>
        item.id === product.id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>Магазин одежды и обуви</h1>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Поиск по товарам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-buttons">
          <button onClick={() => setSelectedCategory('Все')}>Все</button>
          <button onClick={() => setSelectedCategory('Одежда')}>Одежда</button>
          <button onClick={() => setSelectedCategory('Обувь')}>Обувь</button>
        </div>

        <div className="container">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
            />
          ))}
        </div>

        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
      </div>

      {/* Настройка маршрутов для страницы деталей продукта */}
      <Routes>
        <Route path="/product/:id" element={<ProductDetail products={products} />} />
      </Routes>
    </Router>
  );
};

export default App;
