import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Qube Job Solution. All rights reserved.</p>
        <p className="mt-1">Developed for Govt Job Preparation & Tech Learning.</p>
      </div>
    </footer>
  );
};

export default Footer;