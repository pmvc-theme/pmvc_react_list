import { Children } from "react";
import { build } from "react-atomic-molecule";
import Cell from "../organisms/Cell";

const SimpleBody = (props) => {
  const { tr = Cell, rowCount, children } = props;

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
    for (let i = 0, len = rowCount; i < len; i++) {
      const jsx = build(tr, {
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
    if (arr.length) {
      return <tbody>{arr}</tbody>;
    } else {
      return null;
    }
  };

  return renderTR();
};

export default SimpleBody;
