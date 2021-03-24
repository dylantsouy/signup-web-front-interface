import React from 'react';
import ReactDOM from 'react-dom';
import './app.scss';
import App from './App';
import 'antd/dist/antd.css';
import { LOCALFORAGE_INITIATE } from './initiates/initiate';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <App />,
    document.getElementById('root')
);

serviceWorker.unregister();
//Any packages that required configure and/or set something required initiate, please write the initiate code in here
LOCALFORAGE_INITIATE();