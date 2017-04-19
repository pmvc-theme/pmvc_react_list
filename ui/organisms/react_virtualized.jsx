import React, {Children, cloneElement} from 'react'; 
import RVGrid from '../organisms/RVGrid';

const isArray = Array.isArray;

const getChildren = (props) =>
{
    let children = [];
    if (!props.children) {
        return children;
    }
    Children.forEach(props.children, (child)=>{
        if (!child) {
            return;
        }
        if (isArray(child)) {
            children.concat(child);
        } else {
            children.push(child);
        }
    });
    return children;
}

const  RVHeader = (props) =>
{
    
    let children = getChildren(props); 
    return (
        <RVGrid 
            {...props}
            height={props.headerHeight}
            rowHeight={props.headerHeight}
            rowCount={1}
            cellRenderer={({columnIndex, rowIndex, isScrolling, isVisible, parent, ...cellProps}) => {
                if (!children.hasOwnProperty(columnIndex)) {
                    return null;
                }
                let header = children[columnIndex].props.header;
                cellProps = {
                    ...cellProps,
                    key: rowIndex+'-'+columnIndex,
                    columnIndex: columnIndex,
                   // rowIndex: rowIndex,
                   // isScrolling: isScrolling
                };
                let jsx;
                if (React.isValidElement(header)) {
                  jsx = cloneElement(header, cellProps);
                } else if (typeof header === 'function') {
                  jsx = header(cellProps);
                } else {
                  jsx = header;
                }
                return jsx;
            }}
            style={{overflow:'hidden'}}
        />
    );
}


const RVBody = (props) =>
{
    let children = getChildren(props); 
    return (
        <RVGrid 
            {...props}
            cellRenderer={({columnIndex, rowIndex, isScrolling, isVisible, parent, ...cellProps}) => {
                if (!children.hasOwnProperty(columnIndex)) {
                    return null;
                }
                let cell = children[columnIndex].props.cell;
                cellProps = {
                    ...cellProps,
                    key: rowIndex+'-'+columnIndex,
                    columnIndex: columnIndex,
                    rowIndex: rowIndex,
                    //isScrolling: isScrolling
                };
                let jsx;
                if (React.isValidElement(cell)) {
                  jsx = cloneElement(cell, cellProps);
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
