import { SemanticUI } from "react-atomic-molecule";

const Cell = ({ rowIndex, columnIndex, columnKey, ...others }) => (
  <SemanticUI
    {...others}
    data-row={rowIndex}
    data-col={columnIndex || columnKey}
  />
);

export default Cell;
