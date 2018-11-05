import React, { Component } from 'react';
import TextField, { Input } from '@material/react-text-field';
import Select from '@material/react-select';
import Button from '@material/react-button';

class DeviceInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      systemName: "",
      type: "WINDOWS_WORKSTATION",
      hddCapacity: "",
      deviceId: props.match.params.deviceId
      // isNew: /^new/i.test(props.match.path)
    };
    this._changeSystemName = this._changeSystemName.bind(this);
    this._changeType = this._changeType.bind(this);
    this._changeHddCapacity = this._changeHddCapacity.bind(this);
    this._handleSave = this._handleSave.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  render() {
    return (
      <Root>
        <Grid>
          <GridContent>
            <GridCell>
              <TextField label='System Name' outlined>
                <Input value={this.state.systemName} onChange={this._changeSystemName}/>
              </TextField>
            </GridCell>
          </GridContent>
          <GridContent>
            <GridCell>
              <Select label='Type' value={this.state.type} outlined onChange={this._changeType}>
                <option value='WINDOWS_WORKSTATION'>Windows Workstation</option>
                <option value='WINDOWS_SERVER'>Windows Server</option>
                <option value='MAC'>Mac</option>
              </Select>
            </GridCell>
          </GridContent>
          <GridContent>
            <GridCell>
              <TextField label='HDD Capacity (GB)' outlined>
                <Input value={this.state.hddCapacity} onChange={this._changeHddCapacity}/>
              </TextField>
            </GridCell>
          </GridContent>
          <GridContent>
            <GridCell>
              <Button onClick={this._handleSave} outlined>
                Save
              </Button>
              <Button onClick={this._handleClose}>
                Close
              </Button>
            </GridCell>
          </GridContent>
        </Grid>
      </Root>
    );
  }

  componentDidMount() {
    if (this.state.deviceId) {
      fetch(`http://localhost:3000/devices/${this.state.deviceId}`)
        .then((response) => response.json())
        .then((device) => {
          this.setState({systemName: device.system_name, type: device.type, hddCapacity: device.hdd_capacity});
        });
    } else {
      this.setState({systemName: "", type: "WINDOWS_WORKSTATION", hddCapacity: ""});
    }
  };

  _changeSystemName(e) {
    this.setState({systemName: e.target.value});
  }

  _changeType(e) {
    this.setState({type: e.target.value});
  }

  _changeHddCapacity(e) {
    this.setState({hddCapacity: e.target.value});
  }

  _handleSave() {
    if (this.state.deviceId) {
      this._update();
    } else {
      this._create();
    }
    this.props.history.push('/');
  }

  _create() {
    console.log("create");
    fetch('http://localhost:3000/devices', {
      method: "POST",
      body: JSON.stringify({
        system_name: this.state.systemName,
        type: this.state.type,
        hdd_capacity: this.state.hddCapacity
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => console.log(response));
  }

  _update() {
    fetch(`http://localhost:3000/devices/${this.state.deviceId}`, {
      method: "PUT",
      body: JSON.stringify({
        system_name: this.state.systemName,
        type: this.state.type,
        hdd_capacity: this.state.hddCapacity
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => console.log(response));
  }

  _handleClose() {
    this.props.history.push('/');
  }

}

const Root = (props) => (
  <div {...props}>

  </div>
);

const Grid = (props) => (
  <div className="demo-grid mdc-layout-grid" {...props}>

  </div>
);

const GridContent = (props) => (
  <div className="mdc-layout-grid__inner" {...props}>

  </div>
);

const GridCell = (props) => (
  <div style={{textAlign: "center"}}
       className="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-12" {...props}>

  </div>
);

export default DeviceInput;
