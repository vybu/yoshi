import React from 'react';
import ReactDOM from 'react-dom';
import HttpClient from 'yoshi-server-client';
import { HttpProvider } from 'yoshi-server-react';
import App from './components/App';

const client = new HttpClient({ baseUrl: 'http://localhost:3000' });

ReactDOM.render(
  <HttpProvider client={client}>
    <App />
  </HttpProvider>,
  document.getElementById('root'),
);
