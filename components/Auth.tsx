
import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import Button from './ui/Button';

const Auth: React.FC = () => {
  const handleAuth = () => netlifyIdentity.open();
  return (
    <div className="flex items-center gap-2">
      <Button onClick={handleAuth} variant="secondary" className="h-9 px-3">Login / Signup</Button>
    </div>
  );
};

export default Auth;
