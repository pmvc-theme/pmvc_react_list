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

const RVHeader = ({tr, ...props}) =>
{
    
    let children = getChildren(props); 
    return (
        <RVGrid 
            {...props}
            height={props.headerHeight}
            rowHeight={props.headerHeight}
            rowCount={1}
            cellRenderer={({columnIndex, rowIndex, isScrolling, isVisible, style, parent}) => {
                if (!children.hasOwnProperty(columnIndex)) {
                    return null;
                }
                let header = children[columnIndex].props.header;
                const key = rowIndex+'-'+columnIndex;
                const cellProps = {
                    key,
                    columnIndex,
                    style: Styles.inner
                };
                const jsx = getCell(header, cellProps);
                const thisStyle = {
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
                    >
                        {jsx}
                    </SemanticUI>
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

// https://github.com/bvaughn/react-virtualized/blob/656033edec3e33c89a468643ca861625fc5ade6f/source/Grid/types.js#L8-L16
const RVBody = ({tr, ...props}) =>
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
                return (
                    <SemanticUI
                        style={{
                            ...get(thisTR, ['props', 'style'], []),
                            ...Styles.cell,
                            ...style,
                        }}
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
        padding: 5,
        height: '100%'
    },
    cell: {
        borderLeft: '1px solid rgba(34, 36, 38, 0.1)',
        borderTop: '1px solid rgba(34, 36, 38, 0.1)',
    },
    headerCell: {
        borderLeft: '1px solid rgba(34, 36, 38, 0.1)',
        borderTop: '1px solid rgba(34, 36, 38, 0.1)',
        whiteSpace: 'nowrap',
        lineHeight: '30px',
        background: '#f9fafb'
    }
};
