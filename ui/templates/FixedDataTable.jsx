import React, {PureComponent, Children} from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';

const keys = Object.keys;

class List extends PureComponent {
  static defaultProps = {
    defColWidth: 60,
    tableWidth: 1000,
    tableHeight: 1000,
  };

  state = {
    tableWidth: 0,
    tableHeight: 0,
    columnWidths: {},
  };

  _onResize() {
    clearTimeout(this._updateTimer);
    this._updateTimer = setTimeout(this._update, 15);
  }

  _update() {
    let win = window;
    this.setState({
      // tableWidth: win.innerWidth -50,
      // tableHeight: win.innerHeight -30,
    });
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      },
    }));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {tableWidth, tableHeight} = nextProps;
    if (tableWidth !== prevState.tableWidth && tableHeight !== prevState.tableHeight) {
      return {
        tableWidth, tableHeight
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    this._update();
    const win = window;
    if (win.addEventListener) {
      win.addEventListener('resize', this._onResize, false);
    } else if (win.attachEvent) {
      win.attachEvent('onresize', this._onResize);
    } else {
      win.onresize = this._onResize;
    }
  }

  render() {
    const {tableWidth, tableHeight, ...state} = this.state;
    const props = this.props;
    let rows = null;
    if (props.rowsLocator) {
      rows = props.rowsLocator(props.rows);
    } else {
      rows = props.rows;
    }
    console.log(state, props);
    return (
      <Table
        rowHeight={100}
        rowsCount={rows.length}
        width={tableWidth}
        height={tableHeight}
        overflowX="auto"
        overflowY="auto"
        headerHeight={50}
        onColumnResizeEndCallback={this._onColumnResizeEndCallback.bind(this)}
        isColumnResizing={false}>
        {Children.map(props.children, (child, key) => {
          const colW = state.columnWidths[key] || props.defColWidth;
          return (
            <Column
              key={key}
              columnKey={key}
              dataKey={key}
              width={colW}
              maxWidth={tableWidth}
              minWidth={0}
              isResizable={true}
              {...child.props}
            />
          );
        })}
      </Table>
    );
  }
}

export default List;
