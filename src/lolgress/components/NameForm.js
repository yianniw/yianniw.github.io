import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, Stack } from 'react-bootstrap';
import region from '../data/regions.json'

const isBlank = (str) => { return (!str || /^\s*$/.test(str)); }

function NameForm({formData}) {
  const [showText, setShowText] = useState(false);
  const [showRegion, setShowRegion] = useState(false);
  const [border, setBorder] = useState("info")

  function validate(e) {
    e.preventDefault();

    let textShow = isBlank(e.target[0].value);
    let regionShow = (e.target[1].textContent === "Region")

    setShowText(textShow);
    setShowRegion(regionShow);
    
    if(textShow || regionShow) {
      setBorder("danger");
    } else {
      setBorder("info");
      formData(e.target[0].value, e.target[1].textContent);
    }
  }

  return (
    <div className={`border + border-${border} rounded`}
         style={{margin: "10px auto", paddingInline: "20px", paddingBlock: "15px", maxWidth: "700px", background: "#EEEEEE"}}>
      <Stack gap="1">
        <Form onSubmit={validate}>
          <Stack direction="horizontal" gap={3}>
            <Form.Control type="text" maxLength="16" placeholder="Summoner Name" />
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