import { expect } from "chai";
import { render } from "reshow-unit";

import Table from "../Table";
import Column from "../../organisms/Column";
import Cell from "../../organisms/Cell";

describe("Test Table", () => {
  it("basic test", () => {
    const wrap = render(<Table />);
    expect(wrap.html()).to.have.string("table");
    expect(wrap.html()).not.have.string("tbody");
  });
  it("has row", () => {
    const rows = [["a1"], ["a2"]];
    const Dom = (props) => {
      return (
        <Table rows={rows}>
          <Column
            header={<Cell>c1</Cell>}
            cell={({ rowIndex, columnIndex }) => {
              return rows[rowIndex][columnIndex];
            }}
          />
        </Table>
      );
    };
    const wrap = render(<Dom />);
    expect(wrap.html()).to.have.string("tbody");
  });
});
