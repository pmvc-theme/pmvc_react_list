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

const getCell = (cell, props) =>
{
    let jsx;
    if (React.isValidElement(cell)) {
        jsx = cloneElement(cell, props);
    } else if (typeof cell === 'function') {
        jsx = cell(props);
    } else {
        jsx = cell;
    }
    return jsx;
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

const RVHeader = ({getCellStyle, tr, ...props}) =>
{
    const children = getChildren(props); 
    return (
        <RVGrid 
            {...props}
            rowCount={1}
            cellRenderer={({columnIndex, rowIndex, isScrolling, isVisible, style, parent}) => {
                if (!children.hasOwnProperty(columnIndex)) {
                    return null;
                }
                const header = children[columnIndex].props.header;
                const key = rowIndex+'-'+columnIndex;
                const cellProps = {
                    key,
                    columnIndex,
                    rowIndex,
                    style: Styles.inner
                };
                const cellStyle = {
                    ...Styles.headerCell,
                    ...style
                };
                const jsx = getCell(header, cellProps, cellStyle);
                if (!columnIndex) {
                    cellStyle.borderRadius = '.28571429rem 0 0';
                }
                return (
                    <SemanticUI
                        key={key}
                        style={getCellStyle(cellStyle, rowIndex, columnIndex)}
                    >
                        {jsx}
                    </SemanticUI>
                );
            }}
            style={{overflow:'hidden'}}
        />
    );
}


// https://github.com/bvaughn/react-virtualized/blob/656033edec3e33c89a468643ca861625fc5ade6f/source/Grid/types.js#L8-L16
const RVBody = ({getCellStyle, tr, ...props}) =>
{
    let children = getChildren(props); 
    return (
        <RVGrid 
            {...props}
            cellRenderer={({columnIndex, rowIndex, isScrolling, isVisible, style, parent}) => {
                if (!children.hasOwnProperty(columnIndex)) {
                    return null;
                }
                const cell = children[columnIndex].props.cell;
                const key = rowIndex+'-'+columnIndex;
                const cellProps = {
                    key,
                    columnIndex,
                    rowIndex,
                    style: Styles.inner
                };
                const jsx = getCell(cell, cellProps);
                const thisTR = getTR(tr, rowIndex);
                const cellStyle = {
                    ...get(thisTR, ['props', 'style'], []),
                    ...Styles.cell,
                    ...style,
                }
                return (
                    <SemanticUI
                        style={getCellStyle(cellStyle, rowIndex, columnIndex)}
                        className={ get(thisTR, ['props', 'className']) }
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
    inner: {
        height: '100%'
    },
    cell: {
        padding: 5,
        borderLeft: '1px solid rgba(34, 36, 38, 0.1)',
        borderTop: '1px solid rgba(34, 36, 38, 0.1)',
    },
    headerCell: {
        padding: 5,
        borderLeft: '1px solid rgba(34, 36, 38, 0.1)',
        borderTop: '1px solid rgba(34, 36, 38, 0.1)',
        whiteSpace: 'nowrap',
        lineHeight: '30px',
        background: '#f9fafb'
    }
};
