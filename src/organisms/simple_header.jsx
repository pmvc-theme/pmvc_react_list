import React, {Component} from 'react'; 
import {
    assign, 
    SemanticUI
} from 'react-atomic-molecule';

export default class SimpleHeader extends Component
{
    render()
    {
        let children = this.props.children; 
        return (
            <thead>
                <tr>
                   {()=>{
                        let arr = [];
                        let props;
                        let header;
                        let jsx;
                        React.Children.forEach(children, (child, key)=>{
                            props = assign({atom:'th', key:key}, child.props);
                            header = props.header;
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
                        return arr;
                   }()}
                </tr>
            </thead>
        );
    }
}
