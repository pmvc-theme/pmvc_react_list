import { SemanticUI } from "react-atomic-molecule";

const Cell = ({ rowIndex, columnIndex, ...others }) => (
  <SemanticUI {...others} data-row={rowIndex} data-col={columnIndex} />
);

export default Cell;
