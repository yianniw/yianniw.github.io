import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, Spinner } from 'react-bootstrap';
import region from '../data/regions.json'
import './NameForm.css';
import { isMobile, isBlank } from '../Util';

function NameForm({rAPI, updateSummoner}) {
  const [showText, setShowText] = useState(false);
  const [showRegion, setShowRegion] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [border, setBorder] = useState("info");
  const [isLoading, setIsLoading] = useState(false);

  const validate = async (name, region) => {
    setIsLoading(true);
    if(await rAPI.fetchSummoner(rAPI, name, region)) {
      setBorder("info");
      setInvalidName(false);
      updateSummoner(rAPI.SummonerId);
    } else {
      setBorder("danger");
      setInvalidName(true);
    }
    setIsLoading(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let textShow = isBlank(e.target[0].value);
    let regionShow = (e.target[1].textContent === "Region")
    setShowText(textShow);
    setShowRegion(regionShow);
    
    if(textShow || regionShow) {
      setBorder("danger");
      setInvalidName(false);
    } else {
      validate(e.target[0].value, e.target[1].textContent);
    }
  }

  return (
    <div id={`nameform${isMobile() ? "-mobile" : ""}`} className={`border border-${border} rounded`}>
      <Form onSubmit={handleSubmit}>
        <div id={`content${isMobile() ? "-mobile" : ""}`}>
          <Form.Control type="text" placeholder="Summoner Name..." />
          <RegionPicker />
          <div className="vr" />
          {!isLoading && <Button type="submit" style={{paddingInline: "15px"}}>Go</Button>}
          {isLoading &&
          <Button style={{paddingInline: "15px"}} disabled>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            <span className="visually-hidden">Loading...</span>
          </Button>}
        </div>
      </Form>
      {(showText || showRegion || invalidName) &&
      <div id='warnings'>
        {showText && <span style={{color: "red"}}>Enter a Summoner Name!</span>}
        {showRegion && <span style={{color: "red"}}>Select a Region!</span>}
        {invalidName && <span style={{color: "red"}}>Could not find Summoner!</span>}
      </div>}
    </div>
  );
}

function RegionPicker() {
  const [btnTitle, setTitle] = useState("Region");
  const [options] = useState(Object.keys(region));
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

export default NameForm;