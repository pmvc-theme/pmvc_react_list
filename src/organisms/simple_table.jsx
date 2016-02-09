import React, {Component} from 'react'; 
import SimpleHeader from './simple_header'; 
import SimpleBody from './simple_body'; 

export default class SimpleTable extends Component
{
    render()
    {
        return (
            <table className="ui fixed single line celled table">
                <SimpleHeader {...this.props}/>
                <SimpleBody {...this.props}/>
            </table>
        );
    }
}
