import React, { useEffect, useState } from "react";
import { Stack, Image, DropdownButton, Dropdown} from "react-bootstrap";
import './ChampGrid.css';
import { importAll, isMobile } from "../Util";

const decoration = importAll(require.context('../data/mastery/decorations', false, /\.(png|jpe?g|svg)$/));
const crest = importAll(require.context('../data/mastery/crests', false, /\.(png|jpe?g|svg)$/));

function ChampGrid({ rAPI, currentSummoner, rowLength = 6 }) {
  const [showDecoration, setShowDecoration] = useState(false);
  const [sort, setSort] = useState("Sort By Name");

  useEffect(() => {
    setSort("Sort By Name");
    setShowDecoration(false);
  }, [currentSummoner]);

  const toggleShowDecoration = (childData) => {
    if(currentSummoner != null) {
      setShowDecoration(childData);
    }
  }

  const updateSort = (sortType) => {
    setSort(sortType);
    if(sortType === "Sort By Name") {
      rAPI.sortByName();
    } else if (sortType === "Sort By Mastery") {
      rAPI.sortByMasteryDescending();
    }
  }

  const getRow = (pos) => {
    var items = [];
    for(var i = pos; ( (i < pos + rowLength) && (i < rAPI.getNumChamps()) ); i++) {
      items.push(
        <div
          key={`icon${i}`}
          className={`icon${isMobile() ? "-mobile" : ""}${showDecoration ? " show-decoration" : ""}`}>
          <Image
            className={`image${isMobile() ? "-mobile" : ""}`}
            src={rAPI.getChampIcon(i)} />
          {showDecoration &&
          <Image
            className={`decoration${isMobile() ? "-mobile" : ""}`}
            src={decoration[`level${rAPI.getChampLevel(i)}.png`]} />}
          <p className={`caption${showDecoration ? " show-decoration" : ""}`}>
            {rAPI.getChampName(i)}
          </p>
        </div>
      );
    }
    return items;
  }

  const getGrid = () => {
    var items = [];
    var numRows = Math.ceil(rAPI.getNumChamps() / rowLength);
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
        <MasteryViewToggle toggleShowDecoration={toggleShowDecoration} currentSummoner={currentSummoner} />
        <div className="ms-auto" />
        <ChampSort sort={sort} updateSort={updateSort} currentSummoner={currentSummoner} />
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

function ChampSort({sort, updateSort}) {
  const [btnTitle, setTitle] = useState(sort);
  const [options] = useState(["Sort By Name", "Sort By Mastery"]);
  const [isActive, setActive] = useState(Array(options.length).fill(false));

  useEffect(() => {
    setTitle(sort);
    let newArr = Array(options.length).fill(false);
    newArr[options.indexOf(sort)] = true;
    setActive(newArr);
  }, [options, sort]);

  const handleChange = (e) => {
    let pos = options.indexOf(e.target.textContent);
    let newArr = Array(options.length).fill(false);
    newArr[pos] = true;
    setActive(newArr);
    setTitle(e.target.textContent);
    updateSort(e.target.textContent);
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

function MasteryViewToggle({toggleShowDecoration, currentSummoner}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
  }, [currentSummoner]);

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

export default ChampGrid;