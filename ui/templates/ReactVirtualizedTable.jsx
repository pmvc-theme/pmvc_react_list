import React from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
import {ScrollSync, AutoSizer} from 'react-virtualized'; 

import {RVHeader, RVBody} from '../organisms/react_virtualized';

const ReactVirtualizedTable = ({
    style,
    height,
    headerHeight,
    getHeaderCellStyle,
    getBodyCellStyle,
    ...props
}) =>
<ScrollSync>
    {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {
        if (!style) {
            style = Styles.container
        }
        return (
            <AutoSizer disableHeight={true} style={style}>
                {({width})=>
                    <SemanticUI>
                        <RVHeader {...props}
                            height={headerHeight}
                            rowHeight={headerHeight}
                            scrollLeft={scrollLeft}
                            width={width}
                            getCellStyle={getHeaderCellStyle}
                        />
                        <RVBody {...props}
                            height={height-headerHeight}
                            onScroll={onScroll}
                            width={width}
                            getCellStyle={getBodyCellStyle}
                        />
                    </SemanticUI>
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
