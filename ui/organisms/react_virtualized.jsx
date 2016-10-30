import React from 'react'; 
import {
    assign
} from 'react-atomic-molecule';
import RVGrid from '../organisms/RVGrid';

const  RVHeader = (props) =>
{
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


const RVBody = (proos) =>
{
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

export {RVHeader, RVBody};
