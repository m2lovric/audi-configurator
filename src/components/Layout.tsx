import React from 'react';
import Navigation from './Navigation/Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <main className='main'>{children}</main>
    </>
  );
};

export default Layout;
