import React from 'react';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Routes from './routes';
import history from './services/history';
import store from './store';
import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
