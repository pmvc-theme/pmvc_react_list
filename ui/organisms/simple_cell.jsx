import React, {Component} from 'react'; 

import {
    SemanticUI
} from 'react-atomic-molecule';

export default class SimpleCell extends Component
{
    render()
    {
        const {columnIndex, ...others} = this.props;
        return (
            <SemanticUI {...others} />
        );
    }
}
