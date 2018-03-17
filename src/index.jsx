import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './main/app.jsx';
import reducers from './main/reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__    //integra com extensão do navegador (plugin do browser), tem por finalidade ajudar durante o desenvolvimento a enxergar passo-a-passo o que acontece na aplicação, cada ação e mudança de estado
    && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducers, devTools);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'));