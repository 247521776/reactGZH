import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './views/reply';
import store from "./store";
import Provider from "./Provider";
// import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
// registerServiceWorker();
