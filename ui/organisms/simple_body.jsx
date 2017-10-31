import React, {Component, cloneElement, createElement} from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
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
        const {tr, rowsCount} = this.props;
        let arr = [];
        for (let i = 0, len = rowsCount; i < len; i++) {
            let jsx;
            if (React.isValidElement(tr)) {
                jsx = cloneElement(tr, {rowIndex: i, key: i}, this.renderTD(i));
            } else {
                if (typeof tr === 'function') { 
                    jsx = tr({rowIndex: i, key: i, children: this.renderTD(i)});
                }
                if (!React.isValidElement(jsx)) {
                    jsx = createElement(
                        SemanticUI,
                        {
                            key: i,
                            atom: 'tr',
                        },
                        this.renderTD(i)
                    );
                }
            }
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
            if (!child) {
                return;
            }
            props = {atom:'td', key:key, rowIndex:rowIndex, columnIndex:key};
            cell = child.props.cell;
            if (React.isValidElement(cell)) {
                jsx = cloneElement(cell, props);
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
