var React = require('react');
var FixedDataTable = require('fixed-data-table');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

module.exports = React.createClass({
    displayName: 'PMVCReactList',
    statics: {
    },
    getDefaultProps: function(){
        return {
        };
    },
    getInitialState: function () {
        return {
            path: this.props.path,
            tableWidth:1000,
            tableHeight:1000
        };
    },
    render: function(){
        var state = this.state;
        var rows = [
          ['a1', 'b1', 'c1'],
          ['a2', 'b2', 'c2'],
          ['a3', 'b3', 'c3']
        ];
        var rowGetter=function (rowIndex) {
          return rows[rowIndex];
        };
        return (
          <Table
            rowHeight={50}
            rowGetter={rowGetter}
            rowsCount={rows.length}
            width={state.tableWidth}
            height={state.tableHeight}
            overflowX="auto"
            overflowY="auto"
            headerHeight={50}>
            <Column
              label="Col 1"
              width={200}
              dataKey={0}
              fixed={true}
            />
            <Column
              label="Col 2"
              width={200}
              dataKey={1}
            />
          </Table>
        );  
  },
  componentDidMount() {
    this._update();
    var win = window;
    if (win.addEventListener) {
      win.addEventListener('resize', this._onResize, false);
    } else if (win.attachEvent) {
      win.attachEvent('onresize', this._onResize);
    } else {
      win.onresize = this._onResize;
    }
  },

  _onResize() {
    clearTimeout(this._updateTimer);
    this._updateTimer = setTimeout(this._update, 16);
  },

  _update() {
    var win = window;
    this.setState({
      tableWidth: win.innerWidth -50,
      tableHeight: win.innerHeight -30,
    });
  } 
});
