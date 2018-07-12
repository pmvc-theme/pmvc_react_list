import React, {isValidElement, cloneElement} from 'react'; 
import {Grid} from 'react-virtualized'; 
import {SemanticUI} from 'react-atomic-molecule'

/**
 * Source 
 * https://github.com/bvaughn/react-virtualized/blob/master/source/Grid/Grid.js
 *
 * Readme
 * https://github.com/bvaughn/react-virtualized/blob/master/docs/Grid.md
 *
 */

const RVGrid = props =>
{
    const {registerChild, rowsLocator, getCellStyle, getRowHeight, getColWidth, children, style, rowLocator, colLocator} = props;
    let {rows} = props;
    let rowCount = 0;
    let colCount = 0;
    if (rowsLocator) {
        rows = rowsLocator(rows);
    }
    if (rows && rows[0]) {
        if (children) {
            React.Children.forEach(children, (child, key)=>{
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
        rowHeight={({index})=>getRowHeight(index,props)}
        rowCount={rowCount}
        overscanRowCount={0}
        columnCount={colCount}
        columnWidth={({index})=>getColWidth(index,props)}
        cellRenderer={ cellProps => {
            const {
                rowIndex,
                columnIndex,
                key,
                style,
            } = cellProps
            const row = rowLocator(rowIndex, rows)
            const cell = colLocator(columnIndex, row)
            cellProps.style = getCellStyle(cellProps.style, rowIndex, columnIndex)
            if (!isValidElement(cell)) {
                return <SemanticUI key={key} style={style}>{cell}</SemanticUI>
            } else {
                return cloneElement(
                    cell,
                    cellProps
                )
            }
        }}
        {...props}
        ref={registerChild}
        style={{
            ...style,
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
    getCellStyle: (orgStyles, rowIndex, colIndex) => orgStyles,
    getRowHeight: (index, props)=>{
        return 40;
    },
    getColWidth: (index, props)=>{
        return 100;
    },
};

export default RVGrid;
