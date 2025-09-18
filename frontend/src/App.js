import React from 'react';
import './index.css';
// import UserIngredientsForm from './components/UserIngredientsForm';
// import Header from './pages/Header';
import HomePage from './pages/HomePage';
import Header from './pages/Header';

function App() {
  return (
      <div className="App bg-white">
        <Header />
        <HomePage />
      </div>
  );
}

export default App;
