import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, Stack } from 'react-bootstrap';
import region from '../data/regions.json'

const isBlank = (str) => { return (!str || /^\s*$/.test(str)); }
const isMobile = () => { return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); }

function NameForm() {
  const [showText, setShowText] = useState(false);
  const [showRegion, setShowRegion] = useState(false);
  const [border, setBorder] = useState("border border-info rounded")

  const validate = (e) => {
    isBlank(e.target[0].value) ? setShowText(true) : setShowText(false);
    e.target[1].textContent === "Region" ? setShowRegion(true) : setShowRegion(false);
    (showText && showRegion) ? setBorder("border border-info rounded") : setBorder("border border-danger rounded")
  }

  if(isMobile()) {
    return (
      <div style={{position: 'relative', marginInline: '5px'}}>
        <Form.Control type="text" maxLength="16" placeholder="Summoner Name" />
        <div style={{display: 'flex', position: 'absolute', top: '0px', right: '0px'}}>
          <RegionPicker/>
          <Button type="submit">Go</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={border} style={{margin: "10px", padding: "10px", background: "#EEEEEE"}}>
        <Stack gap="1">
          <Form onSubmit={validate}>
            <Stack direction="horizontal" gap={3}>
              <Form.Control type="text" placeholder="Summoner Name" />
              <RegionPicker />
              <div className="vr" />
              <Button type="submit" style={{paddingInline: "15px"}}>Go</Button>
            </Stack>
          </Form>
          {showText && <span style={{color: "red"}}>Enter a Summoner Name!</span>}
          {showRegion && <span style={{color: "red"}}>Select a Region!</span>}
        </Stack>
      </div>
    );
  }
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