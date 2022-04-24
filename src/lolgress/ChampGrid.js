import React from "react";
import { Stack, Image, Figure } from "react-bootstrap";
import DDragonAPI from "./DDragonAPI";

function ChampGrid({ rowLength = 6, gap = 3, size = "102px", ...props }) {

  const getRow = (pos) => {
    var items = [];
    for(var i = pos; ((i < pos + rowLength) && (i < DDragonAPI.getLength())); i++) {
      items.push(
        <Figure>
          <Figure.Image
            key={DDragonAPI.getKey(i)}
            src={DDragonAPI.getIconURL(i)}
            style={{ width: size, height: size }} />
          <Figure.Caption>{DDragonAPI.getName(i)}</Figure.Caption>
        </Figure>
      );
    }
    return items;
  }

  const getGrid = () => {
    var items = [];
    var numRows = Math.ceil(DDragonAPI.getLength() / rowLength);
    for(var i = 0; i < numRows; i++) {
      items.push(
        <Stack key={`row${i}`}
               gap={gap}
               direction={"horizontal"}
               {...props} >
          {getRow(i * rowLength)}
        </Stack>
      );
    }
    return items;
  }

  return ( <Stack {...props}>{getGrid()}</Stack> );
}

export default ChampGrid;