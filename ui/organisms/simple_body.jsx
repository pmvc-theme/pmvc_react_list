import React, {Component} from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';
export default class SimpleBody extends Component
{
    render()
    {
        return (
            <tbody>
                {this.renderTR()}
            </tbody>
        );
    }

    renderTR()
    {
        let props = this.props;
        let jsx;
        let arr = [];
        for (let i = 0, len = props.rowsCount; i < len; i++) {
           jsx = (
            <tr key={i}>{this.renderTD(i)}</tr>
           );
           arr.push(jsx); 
        }
        return arr;
    }

    renderTD(rowIndex)
    {
        let arr = [];
        let props;
        let children = this.props.children; 
        let cell;
        let jsx;
        const clone = React.cloneElement; 
        React.Children.forEach(children, (child, key)=>{
            props = {atom:'td', key:key, rowIndex:rowIndex, columnIndex:key};
            cell = child.props.cell;
            if (React.isValidElement(cell)) {
              jsx = clone(cell, props);
            } else if (typeof cell === 'function') {
              jsx = cell(props);
              if (!React.isValidElement(jsx)) {
                delete props.rowIndex;
                delete props.columnIndex;
                jsx = (
                    <SemanticUI {...props}>
                    {jsx}
                    </SemanticUI>
                );
              }
            }
            arr.push(jsx);
        })
        return arr;
    }
}
