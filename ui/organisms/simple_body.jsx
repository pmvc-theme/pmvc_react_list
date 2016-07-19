import React, {Component} from 'react'; 
import {
    assign, 
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
        React.Children.forEach(children, (child, key)=>{
            props = assign({atom:'td', key:key, rowIndex:rowIndex}, child.props);
            cell = props.cell;
            delete props.header;
            delete props.cell;
            if (React.isValidElement(cell)) {
              jsx = React.cloneElement(cell, props );
            } else if (typeof cell === 'function') {
              jsx = cell(props);
            } else {
              jsx = (
                <SemanticUI {...props} />
              );
            }
            arr.push(jsx);
        })
        return arr;
    }
}
