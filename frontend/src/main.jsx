import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import { store } from '../store/store.js';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="913944271119-u2lk2j45nbghfavlffabh46eqnf35umd.apps.googleusercontent.com">
    <Provider store={store}>
        <App />
    </Provider>
  </GoogleOAuthProvider>
)
