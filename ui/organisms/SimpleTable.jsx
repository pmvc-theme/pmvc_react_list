import { useCSS, mixClass, SemanticUI } from "react-atomic-molecule";

import SimpleHeader from "./SimpleHeader";
import SimpleBody from "./SimpleBody";

const SimpleTable = (props) => {
  useCSS(["table"], "semantic");
  const { className, style, singleLine = false, wrap } = props;
  const classes = mixClass(
    className,
    {
      single: singleLine,
      line: singleLine,
    },
    "celled",
    "table"
  );
  const tableComponent = (
    <SemanticUI atom="table" className={classes} style={style}>
      <SimpleHeader {...props} />
      <SimpleBody {...props} />
    </SemanticUI>
  );
  if (wrap) {
    return (
      <SemanticUI className="table-wrap" style={Styles.wrap}>
        {tableComponent}
      </SemanticUI>
    );
  } else {
    return tableComponent;
  }
};

export default SimpleTable;

const Styles = {
  wrap: {
    maxWidth: "100%",
    overflowX: "auto",
  },
};
