import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AppContext} from './context/index';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import BasketStore from './store/BasketStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AppContext.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
    basket: new BasketStore(),
  }}>
    <App />
  </AppContext.Provider>
);
