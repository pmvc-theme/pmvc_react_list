import React from 'react'; 
import {
   SemanticUI 
} from 'react-atomic-molecule';
import {ScrollSync, AutoSizer} from 'react-virtualized'; 

import {RVHeader, RVBody} from '../organisms/react_virtualized';

const ReactVirtualizedTable = (props) => 
<ScrollSync>
    {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {
        return (
            <AutoSizer>
                {({width})=>
                    <SemanticUI>
                        <RVHeader {...props} 
                            scrollLeft={scrollLeft}
                            width={width}
                        />
                        <RVBody {...props}
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
