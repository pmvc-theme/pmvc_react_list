import React, { Children, cloneElement } from "react";
import { mixClass, build, SemanticUI } from "react-atomic-molecule";
import get from "get-object-value";

import RVGrid from "../organisms/RVGrid";

const isArray = Array.isArray;

const getChildren = (props) => {
  let children = [];
  if (!props.children) {
    return children;
  }
  Children.forEach(props.children, (child) => {
    if (!child) {
      return;
    }
    if (isArray(child)) {
      children.concat(child);
    } else {
      children.push(child);
    }
  });
  return children;
};

const getCell = (cell, props) => build(cell, { doCallFunction: true })(props);

const getTR = (tr, rowIndex) =>
  build(tr, { doCallFunction: true })({ rowIndex });

const RVHeader = ({ getCellStyle, tr, ...props }) => {
  const children = getChildren(props);
  return (
    <RVGrid
      {...props}
      rowCount={1}
      cellRenderer={({
        columnIndex,
        rowIndex,
        isScrolling,
        isVisible,
        style,
        parent
      }) => {
        if (!children.hasOwnProperty(columnIndex)) {
          return null;
        }
        const header = children[columnIndex].props.header;
        const key = rowIndex + "-" + columnIndex;
        const cellProps = {
          key,
          columnIndex,
          rowIndex,
          style: Styles.inner
        };
        const cellStyle = {
          ...Styles.headerCell,
          ...style
        };
        const jsx = getCell(header, cellProps, cellStyle);
        if (!columnIndex) {
          cellStyle.borderRadius = ".28571429rem 0 0";
        }
        return (
          <SemanticUI
            className="rv-header"
            key={key}
            style={getCellStyle(cellStyle, rowIndex, columnIndex)}
          >
            {jsx}
          </SemanticUI>
        );
      }}
      style={Styles.header}
    />
  );
};

// https://github.com/bvaughn/react-virtualized/blob/656033edec3e33c89a468643ca861625fc5ade6f/source/Grid/types.js#L8-L16
const RVBody = ({ getCellStyle, tr, ...props }) => {
  let children = getChildren(props);
  return (
    <RVGrid
      {...props}
      cellRenderer={({
        columnIndex,
        rowIndex,
        isScrolling,
        isVisible,
        style,
        parent
      }) => {
        if (!children.hasOwnProperty(columnIndex)) {
          return null;
        }
        const cell = children[columnIndex].props.cell;
        const key = rowIndex + "-" + columnIndex;
        const cellProps = {
          key,
          columnIndex,
          rowIndex,
          style: Styles.inner
        };
        const jsx = getCell(cell, cellProps);
        const thisTR = getTR(tr, rowIndex);
        const cellStyle = {
          ...get(thisTR, ["props", "style"], []),
          ...Styles.cell,
          ...style
        };
        return (
          <SemanticUI
            style={getCellStyle(cellStyle, rowIndex, columnIndex)}
            className={mixClass(get(thisTR, ["props", "className"]), "rv-body")}
            key={key}
          >
            {jsx}
          </SemanticUI>
        );
      }}
      style={Styles.body}
    />
  );
};

export { RVHeader, RVBody };

const Styles = {
  inner: {
    height: "100%"
  },
  cell: {
    padding: 5,
    borderLeft: "1px solid rgba(34, 36, 38, 0.1)",
    borderTop: "1px solid rgba(34, 36, 38, 0.1)"
  },
  headerCell: {
    padding: 5,
    borderLeft: "1px solid rgba(34, 36, 38, 0.1)",
    borderTop: "1px solid rgba(34, 36, 38, 0.1)",
    whiteSpace: "nowrap",
    lineHeight: "30px",
    background: "#f9fafb"
  },
  header: {
    overflowX: "hidden",
    overflowY: "hidden"
  },
  body: {
    overflowX: "scroll",
    overflowY: "scroll"
  }
};
