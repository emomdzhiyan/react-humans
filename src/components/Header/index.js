import React, { memo } from 'react';

import './style.scss';

const Header = memo(() => (
  <div className="container-fluid bg-secondary">
    <nav className="navbar">
      <div className="container">
        <a href="/" className="navbar-brand text-white">Humans-test</a>
      </div>
    </nav>
  </div>
));

export default Header;
