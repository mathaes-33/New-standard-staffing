import React from 'react';
import type { User } from 'netlify-identity-widget';
import netlifyIdentity from 'netlify-identity-widget';
import Button from './ui/Button';

interface AuthProps {
    user: User | null;
}

const Auth: React.FC<AuthProps> = ({ user }) => {
  const handleLogin = () => netlifyIdentity.open('login');
  const handleSignup = () => netlifyIdentity.open('signup');
  const handleLogout = () => netlifyIdentity.logout();

  if (user) {
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
      <Button onClick={handleSignup} className="h-9 px-3">Signup</Button>
    </div>
  );
};

export default Auth;
