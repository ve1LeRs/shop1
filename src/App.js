import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import LanguageSwitcher from './components/LanguageSwitcher';
import RecommendedProducts from './components/RecommendedProducts';
import DeliveryOptions from './components/DeliveryOptions';
import UserProfile from './components/UserProfile';
import ChangePassword from './components/ChangePassword';
import Wishlist from './components/Wishlist';
import Reviews from './components/Reviews';
import StoreInfo from './components/StoreInfo';
import Notification from './components/Notification'; // Импортируем Notification
import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('ru');
  const [orderHistory, setOrderHistory] = useState([]);
  const [userProfile, setUserProfile] = useState({ name: '', email: '' });
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(''); // Состояние для уведомления

  const products = [
    { id: 1, name: 'Футболка', price: 1500, image: `${process.env.PUBLIC_URL}/img/shirt.jpg`, category: 'Одежда', description: 'Качественная футболка из хлопка', sizeChart: 'Размерная сетка футболок' },
    { id: 2, name: 'Кроссовки', price: 5000, image: `${process.env.PUBLIC_URL}/img/sneakers.jpg`, category: 'Обувь', description: 'Удобные кроссовки для бега', sizeChart: 'Размерная сетка кроссовок' },
    { id: 3, name: 'Кроссовки 2', price: 10000, image: `${process.env.PUBLIC_URL}/img/sneaker.jpg`, category: 'Обувь', description: 'Стильные кроссовки для города', sizeChart: 'Размерная сетка кроссовок' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000); // Удаляем уведомление через 3 секунды
  };

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
    showNotification(`Товар ${product.name} добавлен в корзину!`); // Показываем уведомление при добавлении товара
  };

 const updateCartItemQuantity = (id, delta) => {
  setCartItems((prevItems) => {
    const updatedItems = prevItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        // Если количество меньше или равно 0, удаляем товар
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean); // Удаляем все null элементы
    return updatedItems;
  });
};

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
      showNotification(`Товар ${product.name} добавлен в избранное!`); // Уведомление для избранного
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleOrder = () => {
    const newOrder = {
      id: orderHistory.length + 1,
      items: cartItems,
      date: new Date().toLocaleDateString(),
    };
    setOrderHistory([...orderHistory, newOrder]);
    setCartItems([]);
  };

  const updateUserProfile = (profileData) => {
    setUserProfile(profileData);
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <Router>
      <div className="header">
        <h1 style={{ textAlign: 'center' }}>Магазин одежды и обуви</h1>
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
        <div className="navigation">
          <Link to="/">Главная</Link>
          <Link to="/cart">Корзина</Link>
          <Link to="/wishlist">Избранное</Link>
          <Link to="/store-info">Информация о магазине</Link>
        </div>
      </div>

      {notification && (
        <Notification 
          message={notification} 
          onClose={() => setNotification('')} 
        />
      )}

      <Routes>
        <Route
          path="/"
          element={(
            <div>
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
                  <div key={product.id}>
                    <ProductCard 
                      product={product} 
                      addToCart={addToCart} 
                      addToWishlist={addToWishlist} 
                    />
                    <Link to={`/product/${product.id}`}>
                      <button>Смотреть подробнее</button>
                    </Link>
                  </div>
                ))}
              </div>
              <DeliveryOptions />
              <h2>Рекомендуемые товары</h2>
              <RecommendedProducts products={products} />
            </div>
          )}
        />
        <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateCartItemQuantity={updateCartItemQuantity} />} />
        <Route path="/profile" element={<UserProfile userProfile={userProfile} updateUserProfile={updateUserProfile} />} />
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/reviews" element={<Reviews products={products} />} />
        <Route path="/store-info" element={<StoreInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
