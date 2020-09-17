import React, { Children, Component, cloneElement, createElement } from "react";
import { build, SemanticUI } from "react-atomic-molecule";
export default class SimpleBody extends Component {
  render() {
    return <tbody>{this.renderTR()}</tbody>;
  }

  renderTR() {
    const { tr, rowsCount } = this.props;
    let arr = [];
    for (let i = 0, len = rowsCount; i < len; i++) {
      let jsx;
      if (React.isValidElement(tr)) {
        jsx = cloneElement(tr, { rowIndex: i, key: i }, this.renderTD(i));
      } else {
        if (typeof tr === "function") {
          jsx = tr({ rowIndex: i, key: i, children: this.renderTD(i) });
        }
        if (!React.isValidElement(jsx)) {
          jsx = createElement(
            SemanticUI,
            {
              key: i,
              atom: "tr",
            },
            this.renderTD(i)
          );
        }
      }
      arr.push(jsx);
    }
    return arr;
  }

  renderTD(rowIndex) {
    let arr = [];
    Children.forEach(this.props.children, (child, key) => {
      if (!child) {
        return;
      }
      const jsx = build(child.props.cell, {
        wrap: "td",
        doCallFunction: true
      })({
        atom: "td",
        key,
        rowIndex,
        columnIndex: key,
      });
      arr.push(jsx);
    });
    return arr;
  }
}
