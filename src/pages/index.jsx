import React, {Component} from 'react'; 
import {List as TableList, Cell, Column} from '../index';

export default class PMVCReactList extends Component
{
    render()
    {
        let rows = [
          ['a1', 'b1', 'c1'],
          ['a2', 'b2', 'c2'],
          ['a3', 'b3', 'c3'],
          ['a1', 'b1', 'c1'],
          ['a2', 'b2', 'c2'],
          ['a3', 'b3', 'c3'],
        ];
       return (
            <TableList rows={rows} width={200} height={100}>
                <Column
                    header={<Cell>h1</Cell>}
                    cell={({rowIndex,columnIndex})=>{
                        return rows[rowIndex][columnIndex] 
                    }}
                />
                <Column
                    header={<Cell>h2</Cell>}
                    cell={({rowIndex,columnIndex})=>{
                        return rows[rowIndex][columnIndex] 
                    }}
                />
                <Column
                    header={<Cell>h3</Cell>}
                    cell={({rowIndex,columnIndex})=>{
                        return rows[rowIndex][2] 
                    }}
                />
            </TableList>
       ); 
    }
}

