import React from 'react'; 
import {Grid} from 'react-virtualized'; 
import {
    assign
} from 'react-atomic-molecule';

const RVGrid = (props) =>
{
    let rows = props.rows;
    let colCount = 0;
    let rowCount = 0;
    if (props.rowsLocator) {
        rows = props.rowsLocator(props.rows);
    }
    if (rows && rows[0]) {
        if (Array.isArray(rows[0])) {
            colCount = rows[0].length;           
        } else {
            colCount = 1;
        }
        rowCount = rows.length;
    } else {
        return null;
    }
    return (
      <Grid
        rowHeight={({index})=>{
            return props.getRowHeight(index,props);
        }}
        rowCount={rowCount}
        overscanRowCount={0}
        columnCount={colCount}
        columnWidth={({index})=>{
            return props.getColWidth(index,props);
        }}
        cellStyle={({rowIndex, columnIndex})=>{
            let style =  props.getColStyle(
                rowIndex,
                columnIndex,
                props
            );
            return assign(
                style,
                {position:'absolute'}
            );
        }}
        cellRenderer={({columnIndex, rowIndex, isScrolling}) => {
            let row = props.rowLocator(rowIndex,rows);
            return props.colLocator(columnIndex,row);
        }}
        {...props}
        style={assign(
            {},
            props.style,
            {
                position:'relative'
            }
        )}
      />
    );  
}

RVGrid.defaultProps = {
    width: 500,
    height: 500,
    rows: [],
    rowsLocator: null,
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
    },
    getColStyle: (colIndex, rowIndex, props)=>{
        return {}
    },
};

export default RVGrid;
