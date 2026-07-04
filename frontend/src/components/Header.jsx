import React from 'react';
import { FiCheckSquare } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="header">
      <FiCheckSquare size={36} color="#6366f1" />
      <h1>TaskTrackr</h1>
    </header>
  );
};

export default Header;
