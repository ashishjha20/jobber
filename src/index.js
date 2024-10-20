import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EmailProvider } from './context/EmailContext';
import { BrowserRouter } from 'react-router-dom';
import { AmountProvider } from './context/AmountContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <EmailProvider>
     <AmountProvider>

     <App />

     </AmountProvider>

    


  </EmailProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
