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
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    return (
      <Root>
        <Grid>
          <GridContent>
            <GridCell>
              <TextField label='System Name' outlined>
                <Input value={this.state.systemName} onChange={this.changeSystemName}/>
              </TextField>
            </GridCell>
          </GridContent>
          <GridContent>
            <GridCell>
              <Select label='Type' value={this.state.type} outlined onChange={this.changeType}>
                <option value='ww'>Windows Workstation</option>
                <option value='ws'>Windows Server</option>
                <option value='m'>Mac</option>
              </Select>
            </GridCell>
          </GridContent>
          <GridContent>
            <GridCell>
              <TextField label='HDD Capacity (GB)' outlined>
                <Input value={this.state.hddCapacity} onChange={this.changeHddCapacity}/>
              </TextField>
            </GridCell>
          </GridContent>
          <GridContent>
            <GridCell>
              <Button onClick={this.handleSave} outlined>
                Save
              </Button>
              <Button onClick={this.handleClose}>
                Close
              </Button>
            </GridCell>
          </GridContent>
        </Grid>
      </Root>
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

  handleSave(e) {
  }

  handleClose(e) {
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
  <div style={{textAlign: "center"}} className="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-12" {...props}>

  </div>
);

export default DeviceInput;
