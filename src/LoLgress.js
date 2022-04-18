import React from 'react'
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';

function LoLgress() {
  return (
    <div>
      <h1>LoLgress!</h1>
      <div className='row'>
        <div className='col'></div>
        <div className='col-5' style={{position: 'relative'}}>
          <NameForm />
          <div style={{display: 'flex', position: 'absolute', top: '0px', right: '13px'}}>
            <RegionPicker />
            <GoButton />
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

class NameForm extends React.Component {
  render() {
    return (
      <div className="name-form">
        <Form id="name-form">
          <Form.Control maxlength="16" placeholder="Summoner Name" />
        </Form>
      </div>
    )
  }
}

class RegionPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { btnTitle: "Region" }
    // TODO: automatically determine region
  }

  handleChange(val) {
    this.setState( {btnTitle: val} );
  }

  render() {
    return (
      <div className="region-picker">
        <DropdownButton id="region-picker" variant="secondary" menuVariant="dark" title={this.state.btnTitle}>
          <Dropdown.Item onClick={(e) => this.handleChange(e.target.textContent)}>NA</Dropdown.Item>
          <Dropdown.Item onClick={(e) => this.handleChange(e.target.textContent)}>EUW</Dropdown.Item>
          <Dropdown.Item onClick={(e) => this.handleChange(e.target.textContent)}>KR</Dropdown.Item>
          <Dropdown.Item onClick={(e) => this.handleChange(e.target.textContent)}>JP</Dropdown.Item>
        </DropdownButton>
      </div>
    )
  }
}

class GoButton extends React.Component {
  render() {
    return (
      <div className='go-button'>
        <Button style={{width: '70px'}}>Go</Button>
      </div>
    )
  }
}

export default LoLgress;