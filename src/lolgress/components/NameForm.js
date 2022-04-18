import React, {useState} from 'react'
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';

function NameForm() {
  const handleSubmit = (e) => {
    console.log(e.target[0].value);
    console.log(e.target[1].textContent);
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
      <Form onSubmit={handleSubmit} className='row'>
        <div className='col'></div>
        <div className='col-5' style={{position: 'relative'}}>
          <Form.Control type="text" maxLength="16" placeholder="Summoner Name" />
          <div style={{display: 'flex', position: 'absolute', top: '0px', right: '13px'}}>
            <RegionPicker />
            <Button type="submit">Go</Button>
          </div>
        </div>
        <div className='col'></div>
      </Form>
    );
  }
}

function RegionPicker() {
  const [btnTitle, setTitle] = useState("Region");
  const handleChange = (val) => setTitle(val);

  return (
    <DropdownButton id="region-picker" variant="secondary" menuVariant="dark" title={btnTitle}>
      <Dropdown.Item onClick={(e) => handleChange(e.target.textContent)}>NA</Dropdown.Item>
      <Dropdown.Item onClick={(e) => handleChange(e.target.textContent)}>EUW</Dropdown.Item>
      <Dropdown.Item onClick={(e) => handleChange(e.target.textContent)}>KR</Dropdown.Item>
      <Dropdown.Item onClick={(e) => handleChange(e.target.textContent)}>JP</Dropdown.Item>
    </DropdownButton>
  );
}

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export default NameForm;