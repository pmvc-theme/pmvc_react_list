import React from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
import {ScrollSync, AutoSizer} from 'react-virtualized'; 

import {RVHeader, RVBody} from '../organisms/react_virtualized';

const ReactVirtualizedTable = ({height, headerHeight, ...props}) =>
<ScrollSync>
    {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {
        return (
            <AutoSizer disableHeight={true}>
                {({width})=>
                    <SemanticUI>
                        <RVHeader {...props}
                            height={headerHeight}
                            rowHeight={headerHeight}
                            scrollLeft={scrollLeft}
                            width={width}
                        />
                        <RVBody {...props}
                            height={height-headerHeight}
                            onScroll={onScroll}
                            width={width}
                        />
                    </SemanticUI>
                }
            </AutoSizer>
        )
    }}
</ScrollSync>

ReactVirtualizedTable.defaultProps = {
    headerHeight: 40
};

export default ReactVirtualizedTable;
