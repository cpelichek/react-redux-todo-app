import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

//Middlewares
import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';        //o redux-thunk faz com que nos nossos todoActions não retornemos mais uma action(!) e sim um método que recebe como parâmetro o dispatch, e é o dispatch então quem realmente irá enviar sua action para os reducers e disparar suas ações

import App from './main/app.jsx';
import reducers from './main/reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__    //integra com extensão do navegador (plugin do browser), tem por finalidade ajudar durante o desenvolvimento a enxergar passo-a-passo o que acontece na aplicação, cada ação e mudança de estado
    && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers, devTools);        //quando usamos o middleware, ao passarmos uma promise para ele, ele irá esperar a promise carregar os dados para então passar essas informações adiante para o payload
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'));