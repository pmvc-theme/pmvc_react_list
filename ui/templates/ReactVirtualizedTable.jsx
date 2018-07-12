import React,{Children} from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
import {ScrollSync, AutoSizer, ColumnSizer} from 'react-virtualized'; 

import {RVHeader, RVBody} from '../organisms/react_virtualized';

const ReactVirtualizedTable = ({
    style,
    headerHeight,
    getHeaderCellStyle,
    getBodyCellStyle,
    getColWidth,
    ...props
}) =>
<ScrollSync>
    {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {
        if (!style) {
            style = Styles.container
        }
        return (
            <AutoSizer>
                { ({width, height}) =>
                <ColumnSizer 
                    width={width}
                    columnCount={Children.count(props.children)}
                >
                { ({adjustedWidth, columnWidth, registerChild}) => {
                    return (
                    <SemanticUI style={{...style, width, height}}>
                        <RVHeader {...props}
                            height={headerHeight}
                            rowHeight={headerHeight}
                            scrollLeft={scrollLeft}
                            width={adjustedWidth}
                            getCellStyle={getHeaderCellStyle}
                            getColWidth={getColWidth ? getColWidth : ()=>columnWidth}
                        />
                        <RVBody {...props}
                            registerChild={registerChild}
                            height={height-headerHeight}
                            onScroll={onScroll}
                            width={adjustedWidth}
                            getCellStyle={getBodyCellStyle}
                            getColWidth={getColWidth ? getColWidth : ()=>columnWidth}
                        />
                    </SemanticUI>
                    )
                }}
                </ColumnSizer>
                }
            </AutoSizer>
        )
    }}
</ScrollSync>

ReactVirtualizedTable.defaultProps = {
    headerHeight: 40,
    getHeaderCellStyle: (orgStyles, rowIndex, colIndex) => orgStyles,
    getBodyCellStyle: (orgStyles, rowIndex, colIndex) => orgStyles,
};

export default ReactVirtualizedTable;

const Styles = {
    container: {
        borderRight: '1px solid rgba(34, 36, 38, 0.1)',
        borderBottom: '1px solid rgba(34, 36, 38, 0.1)',
        borderRadius: '.28571429rem',
        width: '100%'
    },
}
