import React, { memo, Fragment } from 'react';

import Header from '../components/Header';
import HumansList from '../components/HumansList';
import Human from '../components/Human';

const Main = memo(() => (
  <Fragment>
    <Header />
    <div className="container">
      <div className="row">
        <HumansList />
        <Human />
      </div>
    </div>
  </Fragment>
));

export default Main;
