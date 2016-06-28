import React, {Component} from 'react'; 
import {Grid} from 'react-virtualized'; 
import {
    assign
} from 'react-atomic-molecule';

export {ScrollSync} from 'react-virtualized'; 

export class RVGrid extends Component
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
        let rows = props.rows;
        let colCount = 0;
        if (props.rowsLocator) {
            rows = props.rowsLocator(props.rows);
        }
        if (rows && rows[0] && rows[0].length) {
            colCount = rows[0].length;           
        } else {
            return null;
        }
        return (
          <Grid
            width={state.gridWidth}
            height={state.gridHeight}
            rowHeight={({index})=>{
                return props.getRowHeight(index,props);
            }}
            rowCount={rows.length}
            columnCount={colCount}
            columnWidth={({index})=>{
                return props.getColWidth(index,props);
            }}
            cellStyle={({rowIndex, columnIndex})=>{
                return props.getColStyle(
                    rowIndex,
                    columnIndex,
                    props
                );
            }}
            cellRenderer={({columnIndex, rowIndex, isScrolling}) => {
                let row = props.rowLocator(rowIndex,rows);
                return props.colLocator(columnIndex,row);
            }}
            {...props}
          />
        );  
    }
}
RVGrid.defaultProps = {
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
    }
};

export class RVHeader extends Component
{
    render()
    {
        let props = this.props;
        let children = props.children; 
        if (!children) {
            children = [];
        } else if (!('length' in children)) {
            children = [children];
        }
        return (
            <RVGrid 
                {...props}
                height={props.headerHeight}
                rowHeight={props.headerHeight}
                rowCount={1}
                cellRenderer={({columnIndex, rowIndex, isScrolling}) => {
                    if (!children.hasOwnProperty(columnIndex)) {
                        return null;
                    }
                    let header = children[columnIndex].props.header;
                    let headerProps = assign(
                        {
                            columnIndex: columnIndex,
                            rowIndex: rowIndex,
                            isScrolling: isScrolling
                        }
                    );
                    let jsx;
                    if (React.isValidElement(header)) {
                      jsx = React.cloneElement(header, headerProps);
                    } else if (typeof header === 'function') {
                      jsx = header(headerProps);
                    } else {
                      jsx = header;
                    }
                    return jsx;
                }}
                style={{overflow:'hidden'}}
            />
        );
    }
}

export class RVBody extends Component
{
    render()
    {
        let props = this.props;
        let children = props.children; 
        if (!children) {
            children = [];
        } else if (!('length' in children)) {
            children = [children];
        }
        return (
            <RVGrid 
                {...props}
                cellRenderer={({columnIndex, rowIndex, isScrolling}) => {
                    if (!children.hasOwnProperty(columnIndex)) {
                        return null;
                    }
                    let cell = children[columnIndex].props.cell;
                    let cellProps = assign(
                        {
                            columnIndex: columnIndex,
                            rowIndex: rowIndex,
                            isScrolling: isScrolling
                        }
                    );
                    let jsx;
                    if (React.isValidElement(cell)) {
                      jsx = React.cloneElement(cell, cellProps);
                    } else if (typeof cell === 'function') {
                      jsx = cell(cellProps);
                    } else {
                      jsx = cell;
                    }
                    return jsx;
                }}
                style={{overflow:'auto'}}
            />
        );
    }
}
