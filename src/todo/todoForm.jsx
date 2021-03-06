import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grid from '../template/grid';
import IconButton from '../template/iconButton';

import { add, changeDescription, search, clear } from './todoActions';

class TodoForm extends Component {      //mudamos de uma função para uma classe, pois precisamos usar um middleware para que a ação de pesquisa funcione, devido a haverem várias chamadas assincronas lá, e assim precisamo usar aqui o método componentWillMount()
    constructor(props) {
        super(props);
        this.keyHandler = this.keyHandler.bind(this);
    }

    componentWillMount() {
        this.props.search();        //fazemos isso para que quando ele carregar o componente, a lista já venha carregada
    }

    keyHandler(e){
        const { add, search, description, clear } = this.props;        //estamos extraindo de add, search e description (duas funções e um atributo) de this.props, ou seja, as propriedades atuais
        if (e.key === 'Enter') {
            e.shiftKey ? search() : add(description);
        } else if (e.key === 'Escape') {
            clear();
        }
    }

    render() {
        const { add, search, description } = this.props;        //estamos extraindo de add, search e description (duas funções e um atributo) de this.props, ou seja, as propriedades atuais
        return (
        <div role='form' className='todoForm'>
            <Grid cols='12 9 10'>
                <input id='description' className='form-control'
                    placeholder='Adicione uma tarefa'
                    onChange={this.props.changeDescription}
                    onKeyUp={this.keyHandler}
                    value={this.props.description}>
                </input>
            </Grid>
            <Grid cols='12 3 2'>
                <IconButton style='primary' icon='plus'
                    onClick={ () => add(description) }></IconButton>
                <IconButton style='info' icon='search'
                    onClick={ search }></IconButton>
                <IconButton style='default' icon='close'
                    onClick={this.props.clear}></IconButton>
            </Grid>
        </div>
        );
    }
}

const mapStateToProps = state => ({ description: state.todo.description });
const mapDispatchToProps = dispatch =>      //dispatch é o cara que de fato dispara a ação e passa essa ação para todos os Reducers, 
    bindActionCreators({ add, changeDescription, search, clear }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);