import React from 'react'; 
import {Grid} from 'react-virtualized'; 

const RVGrid = (props) =>
{
    let rows = props.rows;
    let rowCount = 0;
    let colCount = 0;
    if (props.rowsLocator) {
        rows = props.rowsLocator(props.rows);
    }
    if (rows && rows[0]) {
        if (props.children) {
            React.Children.forEach(props.children, (child, key)=>{
                if (!child) {
                    return;
                }
                colCount++;
            });
        } else {
            colCount = rows[0].length;
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
        cellRenderer={({columnIndex, rowIndex, isScrolling}) => {
            let row = props.rowLocator(rowIndex,rows);
            return props.colLocator(columnIndex,row);
        }}
        {...props}
        style={{
            ...props.style,
            position:'relative',
            outline: 'none'
        }}
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
};

export default RVGrid;
