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
    return (dispatch, getState) => {
        const description = getState().todo.description;
        const search = description ? `&description__regex=/${description}/`: '';
        const request = axios.get(`${URL}?sort=-createdAt${search}`)        //aqui é feita a chamada assincrona
            .then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data}));
    }
}

export const add = description => {
    return dispatch => {        //é o dispatch quem dispara o evento, a ação, para todos os reducers(!)
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))     //.then é uma promise
            .then(resp => dispatch(search()));      //assim já retornamos a lista atualizada! E por conta da ordem das chamadas das promises .then garantimos que ele só irá fazer essa pesquisa depois que a a promise que adiciona o item houver sido resolvida
    }
}

export const markAsDone = todo => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => dispatch(search()));
    }
}

export const markAsPending = todo => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => dispatch(search()));
    }
}

export const remove = todo => {
    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => dispatch(search()));
    }
}

export const clear = () => {
    return [{ type: 'TODO_CLEAR' }, search()]
}