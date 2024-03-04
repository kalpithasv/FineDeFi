import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { GlobalContextProvider } from './contexts/globalcontext';
import { AnonAadhaarProvider } from 'anon-aadhaar-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const app_id = process.env.REACT_APP_ID || "";
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <GlobalContextProvider>
          <AnonAadhaarProvider _appId={app_id} _isWeb={false}>
            <App />
          </AnonAadhaarProvider>
        </GlobalContextProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);