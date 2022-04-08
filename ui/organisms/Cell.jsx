import React from "react";

import { SemanticUI } from "react-atomic-molecule";

const SimpleCell = ({ rowIndex, columnKey, columnIndex, ...others }) => (
  <SemanticUI {...others} data-row={rowIndex} data-col={columnIndex} />
);

export default SimpleCell;
