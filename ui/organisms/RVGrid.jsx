import React from "react";
import { CellMeasurer, CellMeasurerCache, Grid } from "react-virtualized";
import { build, SemanticUI } from "react-atomic-molecule";

const defaultCellRenderer = ({
  rowLocator,
  colLocator,
  getCellStyle,
  rows
}) => (cellProps) => {
  const {
    rowIndex,
    columnIndex,
    key,
    style,
    isScrolling,
    isVisible,
    parent,
    ...otherCellProps
  } = cellProps;
  const row = rowLocator(rowIndex, rows);
  const cell = colLocator(columnIndex, row);
  otherCellProps.style = getCellStyle(style, rowIndex, columnIndex);
  return build(cell, { wrap: SemanticUI })({
    key,
    "data-is-scrolling": isScrolling,
    ...otherCellProps
  });
};

/**
 * Source
 * https://github.com/bvaughn/react-virtualized/blob/master/source/Grid/Grid.js
 *
 * Readme
 * https://github.com/bvaughn/react-virtualized/blob/master/docs/Grid.md
 *
 */
const RVGrid = (props) => {
  const {
    registerChild,
    rowsLocator,
    getCellStyle,
    getRowHeight,
    getColWidth,
    children,
    style,
    rowLocator,
    colLocator
  } = props;
  let rowCount = 0;
  let colCount = 0;
  const rows = rowsLocator ? rowsLocator(rows) : props.rows;
  if (rows && rows[0]) {
    if (children) {
      React.Children.forEach(children, (child, key) => {
        if (!child) {
          return;
        }
        colCount++;
      });
    } else {
      colCount = rows[0].length;
    }
    rowCount = rows.length;
  } else {
    return null;
  }
  const cellRenderer = defaultCellRenderer({
    rowLocator,
    colLocator,
    getCellStyle,
    rows
  });
  const rowHeight = ({ index }) => getRowHeight(index, props);
  const columnWidth = ({ index }) => getColWidth(index, props);
  const thisStyle = {
    ...style,
    position: "relative",
    outline: "none"
  };
  return (
    <Grid
      rowHeight={rowHeight}
      rowCount={rowCount}
      overscanRowCount={0}
      columnCount={colCount}
      columnWidth={columnWidth}
      cellRenderer={cellRenderer}
      {...props}
      ref={registerChild}
      style={thisStyle}
    />
  );
};

RVGrid.defaultProps = {
  width: 500,
  height: 500,
  rows: [],
  rowsLocator: null,
  rowLocator: (index, rows) => {
    return rows[index];
  },
  colLocator: (index, row) => {
    return row[index];
  },
  getCellStyle: (orgStyles, rowIndex, colIndex) => orgStyles,
  getRowHeight: (index, props) => {
    return 40;
  },
  getColWidth: (index, props) => {
    return 100;
  }
};

export default RVGrid;
