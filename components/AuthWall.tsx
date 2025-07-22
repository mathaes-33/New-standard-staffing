

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, CardContent } from './ui/Card';
import Button from './ui/Button';

interface AuthWallProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const AuthWall: React.FC<AuthWallProps> = ({ icon: Icon, title, description }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => loginWithRedirect();
  const handleSignup = () => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center text-center p-12">
        <div className="bg-primary/10 p-4 rounded-full mb-6">
          <Icon className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        <p className="max-w-md text-muted-foreground mb-8">
          {description}
        </p>
        <div className="flex gap-4">
          <Button onClick={handleLogin} variant="secondary">Login</Button>
          <Button onClick={handleSignup}>Sign Up</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthWall;
