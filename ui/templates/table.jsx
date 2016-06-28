import React, {Component} from 'react'; 
import SimpleTable from '../organisms/simple_table';
import Column from '../organisms/simple_column';
import Cell from '../organisms/simple_cell';


export default class Table extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
        }
    }

    render()
    {
        let state = this.state;
        let props = this.props;
        let rows = null;
        if (props.rowsLocator) {
            rows = props.rowsLocator(props.rows);
        } else {
            rows = props.rows;
        }
        return (
          <SimpleTable
            rowsCount={rows.length}
            {...this.props}
            />
        );  
  }

}
