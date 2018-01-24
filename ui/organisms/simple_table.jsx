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
        const {className, style} = this.props;
        const classes = mixClass (
            this.props.className,
            {
                single: this.props.singleLine,
                line: this.props.singleLine
            },
            'celled',
            'table'
        );
        return (
            <SemanticUI atom="table" className={classes} style={style}>
                <SimpleHeader {...this.props}/>
                <SimpleBody {...this.props}/>
            </SemanticUI>
        );
    }
}
SimpleTable.defaultProps = { singleLine: false };
