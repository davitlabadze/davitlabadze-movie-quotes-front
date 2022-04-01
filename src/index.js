import React, { Suspense } from 'react';
import reportWebVitals from 'reportWebVitals';
import { AuthProvider } from 'context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from 'App';
import 'language/i18next';
import 'index.css';

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const loadingMarkup = <div className='text-4xl text-white'>Loading...</div>;
ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
