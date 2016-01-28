import React, {Component} from 'react'; 
import {Table, Column, Cell} from 'fixed-data-table'; 

export default class List extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            tableWidth:1000,
            tableHeight:1000,
            columnWidths: {
                col1: 600
            }
        }
    }

    render()
    {
        let state = this.state;
        let props = this.props;
        let rows = null;
        if (props.rowsLocator) {
            rows = props.rowsLocator(props.rows);
        } else {
            rows = props.rows;
        }
        return (
          <Table
            rowHeight={100}
            rowsCount={rows.length}
            width={state.tableWidth}
            height={state.tableHeight}
            overflowX="auto"
            overflowY="auto"
            headerHeight={50}
            onColumnResizeEndCallback={this._onColumnResizeEndCallback.bind(this)}
            isColumnResizing={false}
            >
            <Column
              columnKey="col1"
              width={state.columnWidths.col1}
              maxWidth={state.tableWidth}
              minWidth={0}
              dataKey={0}
              isResizable={true}
              cell={({rowIndex, ...cellProps}) => (
                <Cell>{rows[rowIndex]}</Cell>
              )}
            />
          </Table>
        );  
  }

  componentDidMount()
  {
      this._update();
      var win = window;
      if (win.addEventListener) {
          win.addEventListener('resize', this._onResize, false);
      } else if (win.attachEvent) {
          win.attachEvent('onresize', this._onResize);
      } else {
          win.onresize = this._onResize;
      }
  }

  _onResize()
  {
    clearTimeout(this._updateTimer);
    this._updateTimer = setTimeout(this._update, 16);
  }

  _update()
  {
    let win = window;
    this.setState({
      tableWidth: win.innerWidth -50,
      tableHeight: win.innerHeight -30,
    });
  } 
  _onColumnResizeEndCallback(newColumnWidth, columnKey)
  {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      }
    }));
  }
}
