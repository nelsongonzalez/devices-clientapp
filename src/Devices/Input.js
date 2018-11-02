import React, { Component } from 'react';
import TextField, { Input } from '@material/react-text-field';
import Select from '@material/react-select';
import Button from '@material/react-button';

class DeviceInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      systemName: '',
      type: 'ww',
      hddCapacity: undefined,
    };
    this.changeSystemName = this.changeSystemName.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeHddCapacity = this.changeHddCapacity.bind(this);
  }

  render() {
    return (
      <div>
        <TextField
          label='System Name'
          outlined>
          <Input
            value={this.state.systemName}
            onChange={this.changeSystemName}/>
        </TextField>

        <Select
          label='Type'
          value={this.state.type}
          outlined
          onChange={this.changeType}>
          <option value='ww'>Windows Workstation</option>
          <option value='ws'>Windows Server</option>
          <option value='m'>Mac</option>
        </Select>

        <TextField
          label='HDD Capacity (GB)'
          outlined>
          <Input
            value={this.state.hddCapacity}
            onChange={this.changeHddCapacity}/>
        </TextField>

        <Button
          outlined>
          Save
        </Button>
        <Button>
          Close
        </Button>
      </div>
    );
  }

  changeSystemName(e) {
    this.setState({systemName: e.target.value});
  }

  changeType(e) {
    this.setState({type: e.target.value});
  }

  changeHddCapacity(e) {
    this.setState({hddCapacity: e.target.value});
  }
}

export default DeviceInput;
