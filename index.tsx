
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

// IMPORTANT: Replace with your Auth0 application's domain and client ID.
// You can find these in your Auth0 dashboard under your application settings.
// It is recommended to store these in environment variables.
const auth0Domain: string = 'dev-ohxb1urtr5jmxde4.us.auth0.com';
const auth0ClientId: string = 'uOBt8CfwqjKirBdETyvkEh2F1OWQ4Bua';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

if (auth0Domain === 'YOUR_AUTH0_DOMAIN' || auth0ClientId === 'YOUR_AUTH0_CLIENT_ID') {
    rootElement.innerHTML = `
        <div style="font-family: sans-serif; padding: 2rem; text-align: center; line-height: 1.6; background: #fff1f2; border: 1px solid #ffdde0; border-radius: 8px; margin: 2rem auto; max-width: 600px;">
            <h1 style="color: #be123c; font-size: 1.5rem; margin:0;">Auth0 Not Configured</h1>
            <p style="color: #4a5568; margin-top: 1rem;">Please configure your Auth0 credentials in <code>index.tsx</code> to enable authentication.</p>
            <p style="color: #4a5568; margin-top: 0.5rem;">Replace <code>YOUR_AUTH0_DOMAIN</code> and <code>YOUR_AUTH0_CLIENT_ID</code> with your actual Auth0 application values.</p>
        </div>
    `;
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  );
