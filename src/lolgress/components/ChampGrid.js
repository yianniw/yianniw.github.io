import React from "react";
import { Stack, Figure } from "react-bootstrap";
import DDragonAPI from "../DDragonAPI";
import './ChampGrid.css';

function ChampGrid({ rowLength = 6, gap = 4, size = "80px" }) {

  const getRow = (pos) => {
    var items = [];
    for(var i = pos; ((i < pos + rowLength) && (i < DDragonAPI.getLength())); i++) {
      items.push(
        <Figure key={`${DDragonAPI.getName(i)}`}>
          <Figure.Image
            src={DDragonAPI.getIconURL(i)}
            style={{ width: size, height: size }} />
          <Figure.Caption
            style={{
              color: "#e9c46a",
              fontWeight: "600"
            }}
          >
            {DDragonAPI.getName(i)}
          </Figure.Caption>
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
        <Stack
          key={`row${i}`}
          gap={gap}
          direction={"horizontal"}
          className={"center"}
        >
          {getRow(i * rowLength)}
        </Stack>
      );
    }
    return items;
  }

  return (
    <div className="champgrid">
      <div className="top-cover" />
      <div className="scroll-frame">
        <div className="bar" />
        {getGrid()}
        <div className="bar" />
      </div>
      <div className="btm-cover" />
    </div>
  );
}

export default ChampGrid;