import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style/index.css"
import Landing from './components/Landing';
import Add from './components/Add';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

