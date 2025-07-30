
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import netlifyIdentity from 'netlify-identity-widget';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Initialize Netlify Identity
netlifyIdentity.init();
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
