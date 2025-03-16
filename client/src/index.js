import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/userStore';
import DishStore from './store/dishStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={
    {
      user: new UserStore(),
      dish: new DishStore()
    }
  }>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>

);