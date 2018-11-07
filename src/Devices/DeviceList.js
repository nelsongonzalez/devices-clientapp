import React, { Component } from 'react';
import Select from '@material/react-select';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import List from '@material/react-list';
import DeviceListItem from './DeviceListItem';
import { allDevices } from './DeviceServices';

class DeviceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      devices: undefined,
      filterByType: 'ALL',
      sortBy: 'SYSTEM_NAME',
    };
    this._filterDevices = this._filterDevices.bind(this);
    this._sortDevices = this._sortDevices.bind(this);
  }

  render() {
    return (
      <Main>
        <Grid>
          <Row>
            <Cell columns={12}>
              <Select label='Device type' value={this.state.filterByType}
                      outlined
                      onChange={(event) => this.setState({filterByType: event.target.value})}>
                <option value='ALL'>All</option>
                <option value='WINDOWS_WORKSTATION'>Windows Workstation</option>
                <option value='WINDOWS_SERVER'>Windows Server</option>
                <option value='MAC'>Mac</option>
              </Select>
              <Select label='Sort by' value={this.state.sortBy}
                      outlined
                      onChange={(event) => this.setState({sortBy: event.target.value})}>
                <option value='SYSTEM_NAME'>System Name</option>
                <option value='HDD_CAPACITY_ASC'>HDD Capacity (ascending)</option>
              </Select>
            </Cell>
          </Row>
          <Row>
            <Cell columns={12}>
              <List twoLine>
                {this.state.devices ? (
                  this.state.devices
                    .filter(this._filterDevices)
                    .sort(this._sortDevices)
                    .map((device) => (
                      <DeviceListItem key={device.id} props={{
                        id: device.id,
                        systemName: device.system_name,
                        type: device.type,
                        hddCapacity: device.hdd_capacity,
                        history: this.props.history
                      }}/>
                    ))
                ) : (
                  <div/>
                )}
              </List>
            </Cell>
          </Row>
        </Grid>
        <Dialog/>
      </Main>
    );
  }

  componentDidMount() {
    allDevices()
      .then((response) => response.json())
      .then((devices) => {
        this.setState({devices: devices})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _filterDevices(device) {
    if (this.state.filterByType === 'ALL') {
      return true;
    }
    return device.type === this.state.filterByType;
  }

  _sortDevices(deviceA, deviceB) {
    if (this.state.sortBy === 'SYSTEM_NAME') {
      return deviceA.system_name.localeCompare(deviceB.system_name);
    }
    return Number(deviceA.hdd_capacity) - Number(deviceB.hdd_capacity);
  }

}

const Main = (props) => (
  <div {...props}>

  </div>
);

const Dialog = (props) => (
  <div className='mdc-dialog'
       role='alertdialog'
       aria-modal='true'
       aria-labelledby='my-dialog-title'
       aria-describedby='my-dialog-content'>
    <div className='mdc-dialog__container'>
      <div className='mdc-dialog__surface'>
        <h2 className='mdc-dialog__title' id='my-dialog-title'>Delete device?</h2>
        <div className='mdc-dialog__content' id='my-dialog-content' {...props}>
          This device will disappear from your list and will not be available anymore.
        </div>
        <footer className='mdc-dialog__actions'>
          <button type='button' className='mdc-button mdc-dialog__button' data-mdc-dialog-action='close'>Cancel</button>
          <button type='button' className='mdc-button mdc-dialog__button mdc-dialog__button--default'
                  data-mdc-dialog-action='accept'>Delete
          </button>
        </footer>
      </div>
    </div>
    <div className='mdc-dialog__scrim'/>
  </div>
);

export default DeviceList;