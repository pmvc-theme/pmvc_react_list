import React, { Children } from "react";
import { build } from "react-atomic-molecule";
import Cell from "../organisms/simple_cell";

const SimpleBody = (props) => {
  const { tr, rowsCount, children } = props;

  const renderTD = (rowIndex) => {
    const arr = [];
    Children.forEach(children, (child, key) => {
      if (!child) {
        return;
      }
      const jsx = build(child.props.cell, {
        wrap: Cell,
        doCallFunction: true,
      })({
        atom: "td",
        key,
        rowIndex,
        columnIndex: key,
      });
      arr.push(jsx);
    });
    return arr;
  };

  const renderTR = () => {
    const arr = [];
    for (let i = 0, len = rowsCount; i < len; i++) {
      const jsx = build(tr || Cell, {
        doCallFunction: true,
      })(
        {
          atom: "tr",
          key: i,
          rowIndex: i,
        },
        renderTD(i)
      );
      arr.push(jsx);
    }
    return arr;
  };

  return <tbody>{renderTR()}</tbody>;
};

export default SimpleBody;
