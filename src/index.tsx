import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = document.createElement('div');
root.className = 'container';
document.body.appendChild(root);
// @ts-ignore
document.body.style = 'background-image: linear-gradient(0deg, rgb(217, 175, 217) 0%, rgb(151, 217, 225) 100%);';
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
