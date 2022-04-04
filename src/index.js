import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app/layout/App';
import { configureStore } from './app/store/configureStore';
import ModalManager from './app/common/modals/ModalManager';
import ScrollToTop from './app/layout/ScrollToTop';


const store = configureStore();
const rootEl = document.getElementById('root');



function render() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <ModalManager />
        <App />
      </BrowserRouter>
    </Provider>,
    rootEl
  );
}

if (module.hot) {
  module.hot.accept('./app/layout/App', function () {
    setTimeout(render);
  });
}

render();
