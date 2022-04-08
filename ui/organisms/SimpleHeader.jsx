import { Children } from "react";
import { build } from "react-atomic-molecule";
import Cell from "../organisms/Cell";

const SimpleHeader = (props) => {
  const { children } = props;
  const arr = [];
  let emptyHeaderCount = 0;

  Children.forEach(children, (child, key) => {
    if (!child) {
      return;
    }
    const { header, cell, ...myProps } = { atom: "th", key, ...child.props };
    if (!header) {
      emptyHeaderCount++;
    }
    arr.push(build(header, { wrap: Cell, doCallFunction: true })(myProps));
  });

  if (emptyHeaderCount === arr.length) {
    return null;
  } else {
    return (
      <thead>
        <tr>{arr}</tr>
      </thead>
    );
  }
};

export default SimpleHeader;
