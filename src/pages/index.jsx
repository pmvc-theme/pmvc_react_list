import React, {Component} from 'react'; 
import TableList from '../templates/list'; 

export default class PMVCReactList extends Component
{
    render()
    {
        let rows = [
          ['a1', 'b1', 'c1'],
          ['a2', 'b2', 'c2'],
          ['a3', 'b3', 'c3']
        ];
       return (<TableList rows={rows}/>); 
    }
}

