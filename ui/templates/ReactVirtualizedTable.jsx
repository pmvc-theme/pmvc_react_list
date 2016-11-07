import React from 'react'; 
import {
   SemanticUI 
} from 'react-atomic-molecule';
import {ScrollSync} from 'react-virtualized'; 

import {RVHeader, RVBody} from '../organisms/react_virtualized';

const ReactVirtualizedTable = (props) => 
<ScrollSync>
    {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {
        return (
            <SemanticUI>
                <RVHeader {...props} 
                    scrollLeft={scrollLeft}
                />
                <RVBody {...props}
                    onScroll={onScroll}
                />
            </SemanticUI>
        )
    }}
</ScrollSync>

ReactVirtualizedTable.defaultProps = {
    headerHeight: 40
};

export default ReactVirtualizedTable;
