import React, { Children } from "react";
import { SemanticUI } from "react-atomic-molecule";
import { ScrollSync, AutoSizer, ColumnSizer } from "react-virtualized";

import { RVHeader, RVBody } from "../organisms/react_virtualized";

const ReactVirtualizedTable = ({
  style,
  headerHeight,
  scrollbarWidth,
  getHeaderCellStyle,
  getBodyCellStyle,
  getColWidth,
  columnCount,
  ...props
}) => (
  <ScrollSync>
    {({
      clientHeight,
      clientWidth,
      onScroll,
      scrollHeight,
      scrollLeft,
      scrollTop,
      scrollWidth
    }) => {
      if (!style) {
        style = Styles.container;
      }
      columnCount = columnCount || Children.count(props.children);
      return (
        <AutoSizer>
          {({ width, height }) => (
            <SemanticUI style={{ ...style, width, height }}>
              <ColumnSizer width={width} columnCount={columnCount}>
                {({ adjustedWidth, columnWidth, registerChild }) => (
                  <RVHeader
                    {...props}
                    registerChild={registerChild}
                    height={headerHeight}
                    rowHeight={headerHeight}
                    scrollLeft={scrollLeft}
                    width={adjustedWidth}
                    getCellStyle={getHeaderCellStyle}
                    getColWidth={getColWidth ? getColWidth : () => columnWidth}
                  />
                )}
              </ColumnSizer>
              <ColumnSizer width={width} columnCount={columnCount}>
                {({ adjustedWidth, columnWidth, registerChild }) => (
                  <RVBody
                    {...props}
                    registerChild={registerChild}
                    onScroll={onScroll}
                    height={height - headerHeight}
                    width={adjustedWidth + scrollbarWidth}
                    getCellStyle={getBodyCellStyle}
                    getColWidth={getColWidth ? getColWidth : () => columnWidth}
                  />
                )}
              </ColumnSizer>
            </SemanticUI>
          )}
        </AutoSizer>
      );
    }}
  </ScrollSync>
);

ReactVirtualizedTable.defaultProps = {
  scrollbarWidth: 19,
  headerHeight: 40,
  getHeaderCellStyle: (orgStyles, rowIndex, colIndex) => orgStyles,
  getBodyCellStyle: (orgStyles, rowIndex, colIndex) => orgStyles
};

export default ReactVirtualizedTable;

const Styles = {
  container: {
    borderRight: "1px solid rgba(34, 36, 38, 0.1)",
    borderBottom: "1px solid rgba(34, 36, 38, 0.1)",
    borderRadius: ".28571429rem",
    width: "100%"
  }
};
