import React from "react";
import SimpleHeader from "./simple_header";
import SimpleBody from "./simple_body";
import { mixClass, SemanticUI } from "react-atomic-molecule";

const SimpleTable = (props) => {
  const { className, style, singleLine, disableWrapper, ...otherProps } = props;
  const classes = mixClass(
    className,
    {
      single: singleLine,
      line: singleLine,
    },
    "celled",
    "table"
  );
  const Table = (
    <SemanticUI atom="table" className={classes} style={style}>
      <SimpleHeader {...otherProps} />
      <SimpleBody {...otherProps} />
    </SemanticUI>
  );

  return disableWrapper ? Table : (
    <SemanticUI className="table-wrap" style={Styles.tableWrap}>{Table}</SemanticUI>
  );
};

SimpleTable.defaultProps = { singleLine: false };

export default SimpleTable;

const Styles = {
  tableWrap: {
    maxWidth: "100%",
    overflow: "auto",
  },
};
