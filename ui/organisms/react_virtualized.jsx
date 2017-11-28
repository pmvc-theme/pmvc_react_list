import React, {Children, cloneElement} from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
import get from 'get-object-value';

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

const RVHeader = ({tr, ...props}) =>
{
    
    let children = getChildren(props); 
    return (
        <RVGrid 
            {...props}
            height={props.headerHeight}
            rowHeight={props.headerHeight}
            rowCount={1}
            cellRenderer={({columnIndex, rowIndex, isScrolling, isVisible, parent, style, ...cellProps}) => {
                if (!children.hasOwnProperty(columnIndex)) {
                    return null;
                }
                let header = children[columnIndex].props.header;
                const key = rowIndex+'-'+columnIndex;
                cellProps = {
                    ...cellProps,
                    key,
                    columnIndex: columnIndex,
                };
                let jsx;
                if (React.isValidElement(header)) {
                  jsx = cloneElement(header, cellProps);
                } else if (typeof header === 'function') {
                  jsx = header(cellProps);
                } else {
                  jsx = header;
                }
                let thisStyle = {
                    ...Styles.headerCell,
                    ...style
                };
                if (!columnIndex) {
                    thisStyle.borderRadius = '.28571429rem 0 0';
                }
                return (
                    <SemanticUI
                        key={key}
                        style={thisStyle}
                    >{jsx}</SemanticUI>
                );
            }}
            style={{overflow:'hidden'}}
        />
    );
}

const getTR = (tr, rowIndex) =>
{
    let jsx;
    if (React.isValidElement(tr)) {
        jsx = cloneElement(tr, {rowIndex});
    } else {
        if (typeof tr === 'function') { 
            jsx = tr({rowIndex});
        } else {
            jsx = tr;
        }
    }
    return jsx;
}   

const RVBody = ({tr, ...props}) =>
{
    let children = getChildren(props); 
    return (
        <RVGrid 
            {...props}
            cellRenderer={({columnIndex, rowIndex, isScrolling, isVisible, parent, style, ...cellProps}) => {
                if (!children.hasOwnProperty(columnIndex)) {
                    return null;
                }
                const cell = children[columnIndex].props.cell;
                const key = rowIndex+'-'+columnIndex;
                cellProps = {
                    ...cellProps,
                    key,
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
                const thisTR = getTR(tr, rowIndex);
                return (
                    <SemanticUI
                        style={{
                            ...get(thisTR, ['props', 'style'], []),
                            ...Styles.cell,
                            ...style,
                        }}
                        className={get(thisTR, ['props', 'className'])}
                        key={key}
                    >
                        {jsx}
                    </SemanticUI>
                );
            }}
            style={{overflow:'auto'}}
        />
    );
}

export {RVHeader, RVBody};

const Styles = {
    cell: {
        borderLeft: '1px solid rgba(34, 36, 38, 0.1)',
        borderTop: '1px solid rgba(34, 36, 38, 0.1)',
        padding: 5
    },
    headerCell: {
        borderLeft: '1px solid rgba(34, 36, 38, 0.1)',
        borderTop: '1px solid rgba(34, 36, 38, 0.1)',
        padding: 5,
        whiteSpace: 'nowrap',
        lineHeight: '30px',
        background: '#f9fafb'
    }
};
