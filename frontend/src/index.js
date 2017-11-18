import React from 'react';
import ReactDOM from 'react-dom';
import storeFactory from './store/index';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = storeFactory();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
