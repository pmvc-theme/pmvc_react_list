import React, { Component } from "react";
import SimpleTable from "../organisms/SimpleTable";
import get from "get-object-value";

const Table = (props) => {
  let rows = get(props, ["rows"], []);
  if (props.rowsLocator) {
    rows = props.rowsLocator(rows);
  }
  return <SimpleTable rowsCount={get(rows, ["length"])} {...props} />;
};

export default Table;
