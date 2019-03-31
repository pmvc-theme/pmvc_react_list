import React, {Component} from 'react'; 

import {
    SemanticUI
} from 'react-atomic-molecule';

export default class SimpleCell extends Component
{
    render()
    {
        const {rowIndex, columnKey, columnIndex, ...others} = this.props;
        return (
            <SemanticUI {...others} />
        );
    }
}
