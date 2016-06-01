import React, {Component} from 'react'; 
import {RVHeader, RVBody, ScrollSync} from '../organisms/ReactVirtualized';
export {default as Cell} from '../organisms/simple_cell';
export {default as Column} from '../organisms/simple_column';

export default class ReactVirtualizedTable extends Component
{
    render()
    {
        let props = this.props;
        return (
            <ScrollSync>
                {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {
                    return (
                        <div>
                            <RVHeader {...props} 
                                scrollLeft={scrollLeft}
                            />
                            <RVBody {...props} onScroll={onScroll}/>
                        </div>
                    )
                }}
            </ScrollSync>
        );
    }
}
ReactVirtualizedTable.defaultProps = {
    headerHeight: 40
};
