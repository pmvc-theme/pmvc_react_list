import React, {Component} from 'react'; 
import SimpleHeader from './simple_header'; 
import SimpleBody from './simple_body'; 
import { 
    mixClass,
    SemanticUI
} from 'react-atomic-molecule'; 

export default class SimpleTable extends Component
{
    render()
    {
        let classes = mixClass (
            this.props.className,
            'fixed',
            {
                single: this.props.singleLine,
                line: this.props.singleLine
            },
            'celled',
            'table'
        );
        return (
            <SemanticUI atom="table" className={classes}>
                <SimpleHeader {...this.props}/>
                <SimpleBody {...this.props}/>
            </SemanticUI>
        );
    }
}
SimpleTable.defaultProps = { singleLine: false };
