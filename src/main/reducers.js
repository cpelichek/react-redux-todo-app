import { combineReducers } from 'redux';

const rootReducer = combineReducers({     //é o reducer que vai concatenar, combinar todos os outros reducers
    todo: () => ({      //essa função retorna o estado mais atual para essa função
        description: 'ler livro',
        list: [{
            _id: 1,
            description: 'Pagar fatura do cartão',
            done: true
        }, {
            _id: 2,
            description: 'Reunião com a equipe às 10:00',
            done: false
        }, {
            _id: 3,
            description: 'Consulta médicas na terça depois do almoço',
            done: false
        }]
    })
});


//Reducer é responsável por retornar o estado atualizado, um objeto atualizado, sempre que houver uma ação do usuário esse reducer vai retornar um objeto novo
export default rootReducer;