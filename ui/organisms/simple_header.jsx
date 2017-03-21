import React, {Component} from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';

export default class SimpleHeader extends Component
{
    render()
    {
        let children = this.props.children; 
        let arr = [];
        let props;
        let header;
        let jsx;
        let emptyHeaderCount = 0;
        React.Children.forEach(children, (child, key)=>{
            if (!child) {
                return;
            }
            props = {atom:'th', key:key, ...child.props};
            if (!props.header) {
                emptyHeaderCount++;
            }
            header = props.header;
            delete props.header;
            delete props.cell;
            if (React.isValidElement(header)) {
              jsx = React.cloneElement(header, props );
            } else if (typeof header === 'function') {
              jsx = header(props);
            } else {
              jsx = (
                <SemanticUI {...props} />
              );
            }
            arr.push(jsx);
        })
        if (emptyHeaderCount === arr.length) {
            return null;
        }
        return (
            <thead><tr>{arr}</tr></thead>
        );
    }
}
