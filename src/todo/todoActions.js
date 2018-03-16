export const changeDescription = event => ({      //esse método é um action creator, que é um método que obrigatoriamente recebe um evento para devolver um objeto que seja uma ação, o qual obrigatoriamente deve ter um type, e eventualmente pode ter um dado a mais como data, valor, etc. Porém por padrão o atributo que retorna junto com o type é um payload.
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value     //event é o evento de escrita no campo de input, target é o próprio campo de input, e o value é o que é escrito nesse input
});