import React from 'react';

function Header() {
  return (
    <header className="mb-8 text-center">
      <div className="relative inline-block">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Job Application Tracker
        </h1>
        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
      </div>
      <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
        Organize your job search journey - track applications, interviews, and offers all in one place
      </p>
    </header>
  );
}

export default Header;