import React, { useState } from "react";
import { Stack, Image, DropdownButton, Dropdown, Form} from "react-bootstrap";
import DDragonAPI from "../DDragonAPI";
import './ChampGrid.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return true });
  return images;
}

const decoration = importAll(require.context('../data/mastery/decorations', false, /\.(png|jpe?g|svg)$/));
const crest = importAll(require.context('../data/mastery/crests', false, /\.(png|jpe?g|svg)$/));

function ChampGrid({ rAPI, rApiReady, rowLength = 6 }) {
  const [showDecoration, setShowDecoration] = useState(false);

  const toggleShowDecoration = (childData) => {
    if(rApiReady) {
      setShowDecoration(childData);
    }
  }

  const getRow = (pos) => {
    var items = [];
    for(var i = pos; ((i < pos + rowLength) && (i < DDragonAPI.getLength())); i++) {
      items.push(
        <div
          key={`${DDragonAPI.getName(i)}`}
          className={`icon${showDecoration ? " show-decoration" : ""}`}>
          <Image
            src={DDragonAPI.getIconURL(i)}
            style={{ width: "74px", height: "74px" }} />
          {showDecoration &&
            <Image
              className="decoration"
              src={decoration[`level${rAPI.getChampLevel(rAPI, DDragonAPI.getKey(i))}.png`]} />}
          <p className={`caption${showDecoration ? " show-decoration" : ""}`}>
            {DDragonAPI.getName(i)}
          </p>
        </div>
      );
    }
    return items;
  }

  const getGrid = () => {
    var items = [];
    var numRows = Math.ceil(DDragonAPI.getLength() / rowLength);
    for(var i = 0; i < numRows; i++) {
      items.push(
        <Stack key={`row${i}`} direction={"horizontal"} className={"center"}>
          {getRow(i * rowLength)}
        </Stack>
      );
    }
    return items;
  }

  return (
    <div className="ChampGrid">
      <Stack gap="3" className="option-bar" direction="horizontal">
        {rApiReady && <MasteryViewToggle toggleShowDecoration={toggleShowDecoration}/>}
        {rApiReady && <div className="ms-auto" ><ChampSort /></div>}
        {!rApiReady && <div className="ms-auto" />}
        <ChampSearch />
      </Stack>
      <div className="grid">
        <div className="scroll-frame">
          <div className="bar" />
          {getGrid()}
          <div className="bar" />
        </div>
        <div className="top-cover" />
        <div className="btm-cover" />
      </div>
    </div>
  );
}

function ChampSort() {
  const [btnTitle, setTitle] = useState("Sort By Name");
  const [options] = useState(["Sort By Name", "Sort By Mastery"]);
  const [isActive, setActive] = useState(Array(options.length).fill(false));

  const handleChange = (e) => {
    let pos = options.indexOf(e.target.textContent);
    let newArr = Array(options.length).fill(false);
    newArr[pos] = true;
    setActive(newArr);
    setTitle(e.target.textContent);
  }

  return (
    <DropdownButton id="region-picker" variant="secondary" menuVariant="dark" title={btnTitle}>
      {options.map((option) => (
        <Dropdown.Item
          key={option}
          onClick={(e) => handleChange(e)}
          active={isActive[options.indexOf(option)]}
        >{option}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

function MasteryViewToggle({toggleShowDecoration}) {
  const [active, setActive] = useState(false);

  const toggle = () => {
    let currentState = !active;
    setActive(currentState);
    toggleShowDecoration(currentState);
  }

  return (
    <div>
    <Image
      src={crest['level1.png']}
      id="toggle-mastery"
      onClick={toggle}
      className={`btn${active ? "" : " inactive"}`}
      style={{width: "68px"}}
    />
  </div>
  );
}

function ChampSearch() {

  return (
    <Form.Control
      type="text"
      placeholder="Search"
      style={{maxWidth: "200px"}}
    />
  );
}

export default ChampGrid;