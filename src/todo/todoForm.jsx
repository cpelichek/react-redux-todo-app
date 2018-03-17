import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grid from '../template/grid';
import IconButton from '../template/iconButton';

import { changeDescription, search } from './todoActions';

class TodoForm extends Component {      //mudamos de uma função para uma classe, pois precisamos usar um middleware para que a ação de pesquisa funcione, devido a haverem várias chamadas assincronas lá, e assim precisamo usar aqui o método componentWillMount()
    constructor(props) {
        super(props);
        this.keyHandler = this.keyHandler.bind(this);
    }

    componentWillMount() {
        this.props.search();        //fazemos isso para que quando ele carregar o componente, a lista já venha carregada
    }

    keyHandler(e){
        if (e.key === 'Enter') {
            e.shiftKey ? props.handleSearch() : props.handleAdd();
        } else if (e.key === 'Escape') {
            props.handleClear();
        }
    }

    render() {
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
                    onClick={this.props.handleAdd}></IconButton>
                <IconButton style='info' icon='search'
                    onClick={this.props.handleSearch}></IconButton>
                <IconButton style='default' icon='close'
                    onClick={this.props.handleClear}></IconButton>
            </Grid>
        </div>
        );
    }
}

const mapStateToProps = state => ({ description: state.todo.description });
const mapDispatchToProps = dispatch =>      //dispatch é o cara que de fato dispara a ação e passa essa ação para todos os Reducers, 
    bindActionCreators({ changeDescription, search }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);