import React, {Component} from 'react'; 
import {Grid} from 'react-virtualized'; 

export default class ReactVirtualized extends Component
{
    constructor(props)
    {
        super(props);
        let width  = 500;
        let height = 500;
        if (props.gridWidth) {
            width = props.gridWidth;
        }
        if (props.gridHeight) {
            height = props.gridHeight;
        }
        this.state = {
            gridWidth:width,
            gridHeight:height
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
          <Grid
            width={state.gridWidth}
            height={state.gridHeight}
            rowHeight={({index})=>{
                return props.getRowHeight(index,props);
            }}
            rowCount={rows.length}
            columnCount={rows[0].length}
            columnWidth={({index})=>{
                return props.getColWidth(index,props);
            }}
            cellRenderer={({ columnIndex, isScrolling, rowIndex }) => {
                let row = props.rowLocator(rowIndex,rows);
                return props.colLocator(columnIndex,row);
            }}
          />
        );  
    }
}
ReactVirtualized.defaultProps = {
    rowLocator: (index, rows)=>{
        return rows[index];
    },
    colLocator: (index, row)=>{
        return row[index];
    },
    getRowHeight: (index, props)=>{
        return 40;
    },
    getColWidth: (index, props)=>{
        return 100;
    }
};
