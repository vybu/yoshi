import React from 'react';
import ReactDOM from 'react-dom';
import HttpClient from 'yoshi-server-client';
import Component from './component';

const client = new HttpClient({ baseUrl: '_api/bm' });

ReactDOM.render(
  <Component httpClient={client} />,
  document.getElementById('root'),
);
