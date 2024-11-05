import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AutProvider} from './context/AutContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AutProvider>
      <App />
    </AutProvider>    
  </React.StrictMode>
);
