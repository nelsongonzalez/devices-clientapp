import React, { Component } from 'react';
import Select from '@material/react-select';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import List from '@material/react-list';
import DeviceListItem from './DeviceListItem';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import Fab from "@material/react-fab";
import MaterialIcon from "@material/react-material-icon";
import Checkbox from '@material/react-checkbox';

class DeviceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      devices: props.devices,
      filterByType: 'ALL',
      sortBy: 'SYSTEM_NAME',
      showAll: true,
      filterByTypes: {
        WINDOWS_WORKSTATION: false,
        WINDOWS_SERVER: false,
        MAC: false
      }
    };
    this._filterDevices = this._filterDevices.bind(this);
    this._sortDevices = this._sortDevices.bind(this);
    this._manageState = this._manageState.bind(this);
    this.onDelete = props.onDelete;
  }

  render() {
    return (
      <Main>
        <Grid align='right'>

          <Row>
            <Cell columns={8} align='middle'>

              <FilterPanel>

                <FilterPanelTitle/>

                <Checkbox
                  nativeControlId='my-checkbox'
                  checked={this.state.filterByTypes.WINDOWS_WORKSTATION}
                  onChange={(event, key = 'WINDOWS_WORKSTATION') => this._manageState(event, key)}/>
                <label className='label' htmlFor='my-checkbox'>Windows Workstation</label>

                <Checkbox
                  nativeControlId='my-checkbox1'
                  checked={this.state.filterByTypes.WINDOWS_SERVER}
                  onChange={(event, key = 'WINDOWS_SERVER') => this._manageState(event, key)}/>
                <label className='label' htmlFor='my-checkbox1'>Windows Server</label>

                <Checkbox
                  nativeControlId='my-checkbox2'
                  checked={this.state.filterByTypes.MAC}
                  onChange={(event, key = 'MAC') => this._manageState(event, key)}/>
                <label className='label' htmlFor='my-checkbox2'>Mac</label>
              </FilterPanel>

            </Cell>

            <Cell columns={4}>

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
                      <DeviceListItem key={device.id} device={{
                        id: device.id,
                        systemName: device.system_name,
                        type: device.type,
                        hddCapacity: device.hdd_capacity,
                      }} history={this.props.history} onDelete={this.onDelete}/>
                    ))
                ) : (
                  <div/>
                )}
              </List>
            </Cell>
          </Row>

        </Grid>
        <DeleteConfirmationDialog/>
        <Fab icon={<MaterialIcon icon='create'/>} onClick={() => this.props.history.push('/new')}/>
      </Main>
    );
  }

  _manageState(event, key) {
    const filterByTypes = this.state.filterByTypes;
    filterByTypes[key] = event.target.checked;
    const showAll = Object
      .keys(filterByTypes)
      .map((type) => filterByTypes[type])
      .every((value, index, array) => value === array[0]);
    this.setState({filterByTypes: filterByTypes, showAll: showAll});
  }

  _filterDevices(device) {
    if (this.state.showAll) {
      return true;
    }

    return this.state.filterByTypes[device.type] === true;
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

const FilterPanel = (props) => (
  <span className='filter' {...props}>

  </span>
);

const FilterPanelTitle = (props) => (
  <span className='icon' {...props}>
    <MaterialIcon icon='tune'/> <span className='icon-text'>DEVICE TYPE</span>
  </span>
);

export default DeviceList;
