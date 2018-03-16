/**
 * Reducer é usado para evoluir o estado
 */

import { combineReducers } from 'redux';
import todoReducer from '../todo/todoReducer';

const rootReducer = combineReducers({     //é o reducer que vai concatenar, combinar todos os outros reducers
    todo: todoReducer                         //essa função retorna o estado mais atual para essa função
});


//Reducer é responsável por retornar o estado atualizado, um objeto atualizado, sempre que houver uma ação do usuário esse reducer vai retornar um objeto novo
export default rootReducer;