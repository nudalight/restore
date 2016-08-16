import React from 'react';
import { Route } from 'react-router';
import App from './component/App';
import Home from './component/Home';

export default (
  <Route component={ App }>
    <Route path="/" component={ Home } />
  </Route>
);