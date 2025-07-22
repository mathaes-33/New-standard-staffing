
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from './ui/Button';
import { Spinner } from './icons';

const Auth: React.FC = () => {
  const { 
    loginWithRedirect, 
    logout, 
    user, 
    isAuthenticated, 
    isLoading 
  } = useAuth0();

  const handleLogin = () => loginWithRedirect();
  const handleSignup = () => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
  const handleLogout = () => logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-9 w-44">
        <Spinner className="h-5 w-5 text-primary" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden lg:inline">{user.email}</span>
        <Button onClick={handleLogout} variant="secondary" className="h-9 px-3">Logout</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handleLogin} variant="secondary" className="h-9 px-3">Login</Button>
      <Button onClick={handleSignup} className="h-9 px-3">Sign Up</Button>
    </div>
  );
};

export default Auth;
