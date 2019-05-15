import React, { memo } from 'react';
import Header from '../components/Header';
import HumansList from '../components/HumansList';
import Human from '../components/Human';

const Main = memo(() => (
  <div>
    <Header />
    <div className="container">
      <div className="row">
        <HumansList />
        <Human />
      </div>
    </div>
  </div>
));

export default Main;
