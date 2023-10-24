import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import reduxStore from "./store/redux"
import { persistStore } from 'redux-persist'
import { BrowserRouter } from 'react-router-dom';

let persistor = persistStore(reduxStore);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={reduxStore} >
  <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </PersistGate>
</Provider>
);

