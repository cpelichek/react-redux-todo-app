/**
 * O que o reducer faz?
 * Ele recebe o estado atual e recebe uma action,
 * e sempre que uma action for executada,
 * os reducers da sua aplicação são chamados
 * e você vai dizer se quer mudar o
 * estado dentro desse reducer
 * (que é uma função pura,
 * ou seja que não gera efeito colateral)
 * ou se você quer manter o
 * estado igual do jeito que tá.
 */

const INITIAL_STATE = {
    description: 'Ler livro',
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
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case 'DESCRIPTION_CHANGED':
            return { ...state, description: action.payload };        //De onde vem esse action.payload? Vem justamente da ação que foi criada, que é disparada a partir do evento que o usuário digitou no input, esse evento é chamado e o payload é o valor no campo input do evento que foi disparado (veja todoActions.changeDescription()); essa action vai ser passada para os nossos reducers, vai passar o estado pra ele, vai conferir se mudou o estado e neste caso vai pegar o estado do jeito que tá e replicando ele, para não precisar alterá-lo, e vai mudar a descrição para refletir o que foi feito na ação.
        case 'TODO_SEARCHED':
            return { ...state, list: action.payload.data }
        default:
            return state;
    }
}