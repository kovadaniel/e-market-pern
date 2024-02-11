import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AppContext} from './context/index';
import AppAPI from './http/appAPI';
import AppStore from './store/AppStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = new AppStore();
const api = new AppAPI(store);

root.render(
  <AppContext.Provider value={{ store, api }}>
    <App />
  </AppContext.Provider>
);
