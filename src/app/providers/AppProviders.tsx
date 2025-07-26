import React from 'react';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  // Here you can add context providers like:
  // - Theme provider
  // - State management provider (Redux, Zustand, etc.)
  // - Auth provider
  // - Error boundary
  
  return (
    <React.StrictMode>
      {children}
    </React.StrictMode>
  );
};
