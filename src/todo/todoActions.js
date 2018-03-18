/**
 * Todas as ações da nossa aplicação de lista de tarefas
 * Obs.: toda request é um tipo de promise
 */

import axios from 'axios';

const URL = 'http://localhost:3003/api/todos';

export const changeDescription = event => ({      //esse método é um action creator, que é um método que obrigatoriamente recebe um evento para devolver um objeto que seja uma ação, o qual obrigatoriamente deve ter um type, e eventualmente pode ter um dado a mais como data, valor, etc. Porém por padrão o atributo que retorna junto com o type é um payload.
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value     //event é o evento de escrita no campo de input, target é o próprio campo de input, e o value é o que é escrito nesse input
});

export const search = () => {       //precisamos de um middleware para permitir que este método sincrono substitua o método assincrono que usávamos antes para fazer a pesquisa (o retorno do promise then)
    const request = axios.get(`${URL}?sort=-createdAt`);        //aqui é feita a chamada assincrona
    return {
        type: 'TODO_SEARCHED',
        payload: request
    }
}

export const add = description => {
    const request = axios.post(URL, {description});
    return [
        { type: 'TODO_ADDED', payload: request },
        search()        //assim já retornamos a lista atualizada! Porém é preciso garantir de que ele só irá fazer essa pesquisa depois que a a promise que adiciona o item houver sido resolvida
    ]
}