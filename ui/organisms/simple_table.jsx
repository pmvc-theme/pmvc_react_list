import React, { Component } from "react";
import SimpleHeader from "./simple_header";
import SimpleBody from "./simple_body";
import { useCSS, mixClass, SemanticUI } from "react-atomic-molecule";

const SimpleTable = (props) => {
  useCSS(["table"], "semantic");
  const { className, style, singleLine = false } = props;
    const classes = mixClass(
      className,
      {
        single: singleLine,
        line: singleLine,
      },
      "celled",
      "table"
    );
    return (
      <SemanticUI atom="table" className={classes} style={style}>
        <SimpleHeader {...props} />
        <SimpleBody {...props} />
      </SemanticUI>
    );
};

export default SimpleTable;
