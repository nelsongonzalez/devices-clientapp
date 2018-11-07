import React, { Component } from 'react';
import TextField, { Input } from '@material/react-text-field';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import Select from '@material/react-select';
import Button from '@material/react-button';
import { createDevice, getDevice, updateDevice } from './DeviceServices';

class DeviceInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      systemName: '',
      type: 'WINDOWS_WORKSTATION',
      hddCapacity: '',
      deviceId: props.match.params.deviceId
    };
    this._handleSave = this._handleSave.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  render() {
    return (
      <Main>
        <Grid className='form'>

          <Row>
            <Cell columns={12} className='field'>
              <TextField label='System Name' outlined>
                <Input value={this.state.systemName}
                       onChange={(event) => this.setState({systemName: event.target.value})}/>
              </TextField>
            </Cell>
          </Row>

          <Row>
            <Cell columns={12} className='field'>
              <Select label='Type' value={this.state.type} outlined
                      onChange={(event) => this.setState({type: event.target.value})}>
                <option value='WINDOWS_WORKSTATION'>Windows Workstation</option>
                <option value='WINDOWS_SERVER'>Windows Server</option>
                <option value='MAC'>Mac</option>
              </Select>
            </Cell>
          </Row>

          <Row>
            <Cell columns={12} className='field'>
              <TextField label='HDD Capacity (GB)' outlined>
                <Input value={this.state.hddCapacity}
                       onChange={(event) => this.setState({hddCapacity: event.target.value})}/>
              </TextField>
            </Cell>
          </Row>

          <Row>
            <Cell columns={12} className='field'>
              <Button onClick={this._handleSave} outlined>
                Save
              </Button>
              <Button onClick={this._handleClose}>
                Close
              </Button>
            </Cell>
          </Row>

        </Grid>
      </Main>
    );
  }

  componentDidMount() {
    if (this.state.deviceId) {

      getDevice(this.state.deviceId)
        .then((response) => response.json())
        .then((device) => {
          this.setState({
            systemName: device.system_name,
            type: device.type,
            hddCapacity: device.hdd_capacity
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {

      this.setState({
        systemName: '',
        type: 'WINDOWS_WORKSTATION',
        hddCapacity: ''
      });
    }
  };

  _handleSave() {
    if (this.state.deviceId) {

      this._update();
    } else {

      this._create();
    }
    this.props.history.push('/');
  }

  _create() {
    createDevice({
      system_name: this.state.systemName,
      type: this.state.type,
      hdd_capacity: this.state.hddCapacity
    })
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  }

  _update() {
    updateDevice(this.state.deviceId, {
      system_name: this.state.systemName,
      type: this.state.type,
      hdd_capacity: this.state.hddCapacity
    })
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  }

  _handleClose() {
    this.props.history.push('/');
  }

}

const Main = (props) => (
  <div {...props}>

  </div>
);

export default DeviceInput;
