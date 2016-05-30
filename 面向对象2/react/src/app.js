import React from 'react';
import { render } from 'react-dom';
import StaticComponent from './static-component';

// React.DOM.div(null, ''),
//  React.createElement(StaticComponent),

render(
  <StaticComponent />,
  document.getElementById('example-app')
);