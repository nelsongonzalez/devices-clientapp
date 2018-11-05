import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Select from '@material/react-select';
import MaterialIcon from '@material/react-material-icon';

class DeviceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      devices: undefined,
      filteredDevices: undefined,
      filterByType: 'ALL',
      sortBy: 'SYSTEM_NAME',
    };
    this._changeFilterByType = this._changeFilterByType.bind(this);
    this._changeSortBy = this._changeSortBy.bind(this);
    this._sortDevices = this._sortDevices.bind(this);
  }

  render() {
    return (
      <Root>
        <Grid>
          <GridContent>
            <GridCell>
              <Select label='Device type' value={this.state.filterByType} outlined
                      onChange={this._changeFilterByType}>
                <option value='ALL'>All</option>
                <option value='WINDOWS_WORKSTATION'>Windows Workstation</option>
                <option value='WINDOWS_SERVER'>Windows Server</option>
                <option value='MAC'>Mac</option>
              </Select>
              <Select label='Sort by' value={this.state.sortBy} outlined onChange={this._changeSortBy}>
                <option value='SYSTEM_NAME'>System Name</option>
                <option value='HDD_CAPACITY_ASC'>HDD Capacity (ascending)</option>
              </Select>
            </GridCell>
          </GridContent>
          <GridContent>
            <List>
              {this.state.filteredDevices ? (
                this.state.filteredDevices
                  .sort(this._sortDevices)
                  .map((device) => (
                  <ListItem key={device.id} props={{
                    id: device.id,
                    systemName: device.system_name,
                    type: device.type,
                    hddCapacity: device.hdd_capacity
                  }}/>
                ))
              ) : (
                <div/>
              )}
            </List>
          </GridContent>
        </Grid>
      </Root>
    );
  }

  componentDidMount() {
    fetch('http://localhost:3000/devices')
      .then((response) => response.json())
      .then((devices) => {
        this.setState({devices: devices, filteredDevices: this._filterDevices("ALL", devices)})
      });
  };

  _changeFilterByType(event) {
    if (this.state.filterByType === event.target.value) {
      return;
    }
    this.setState({
      filterByType: event.target.value,
      filteredDevices: this._filterDevices(event.target.value, this.state.devices)
    });
  }

  _changeSortBy(e) {
    this.setState({sortBy: e.target.value});
  }

  _filterDevices(filter, devices) {
    if (filter === "ALL") {
      return devices;
    }
    return devices.filter((device) => device.type === filter);
  }

  _sortDevices(deviceA, deviceB) {
    if (this.state.sortBy === "SYSTEM_NAME") {
      return deviceA.system_name.localeCompare(deviceB.system_name);
    }
    return Number(deviceA.hdd_capacity) - Number(deviceB.hdd_capacity);
  }

}

const Root = (props) => (
  <div {...props}>

  </div>
);

const Grid = (props) => (
  <div className="mdc-layout-grid" {...props}>

  </div>
);

const GridContent = (props) => (
  <div className="mdc-layout-grid__inner" {...props}>

  </div>
);

const GridCell = (props) => (
  <div style={{textAlign: "right"}} className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12" {...props}>

  </div>
);

const List = (props) => (
  <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
    <ul className="mdc-list mdc-list--two-line" {...props}>

    </ul>
  </div>
);

const ListItem = withRouter(({props, history}) => {
  return (
    <li className="mdc-list-item" onClick={() => history.push(`/update/${props.id}`)}>
      <span className="mdc-list-item__text">
        <span className="mdc-list-item__primary-text">{props.systemName}</span>
        <span className="mdc-list-item__secondary-text">{props.type} - {props.hddCapacity}GB</span>
      </span>
      <MaterialIcon className="mdc-list-item__meta material-icons" icon='more_vert'/>
    </li>)
});

export default DeviceList;
