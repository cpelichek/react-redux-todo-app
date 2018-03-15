/**
 * Esta componente tem uma função que recebe uma série de números que determinam o número de colunas na tela para o bootstrap
 */

import React, { Component } from 'react';

export default class Grid extends Component {
    toCssClasses(numbers) {
        const cols = numbers ? numbers.split(' ') : [];      //estamos considerando apenas os 4 primeiros elementos desse array, pois o bootstrap só considera apenas 4 tamanhos de tela

        let classes = '';

        if(cols[0]) classes += `col-xs-${cols[0]}`;
        if(cols[1]) classes += `col-sm-${cols[1]}`;
        if(cols[2]) classes += `col-md-${cols[2]}`;
        if(cols[3]) classes += `col-lg-${cols[3]}`;

        return classes;
    }

    render() {
        const gridClasses = this.toCssClasses(this.props.cols || 12);
        return (
            <div className={gridClasses}>
                {this.props.children}
            </div>
        );
    }
}