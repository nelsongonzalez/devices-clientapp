import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Select from '@material/react-select';
import MaterialIcon from '@material/react-material-icon';
import { MDCDialog } from '@material/dialog';

class DeviceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      devices: undefined,
      filterByType: 'ALL',
      sortBy: 'SYSTEM_NAME',
    };
    this._changeFilterByType = this._changeFilterByType.bind(this);
    this._changeSortBy = this._changeSortBy.bind(this);
    this._sortDevices = this._sortDevices.bind(this);
    this._filterDevices = this._filterDevices.bind(this);
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
              {this.state.devices ? (
                this.state.devices
                  .filter(this._filterDevices)
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
        <Dialog/>
      </Root>
    );
  }

  componentDidMount() {
    fetch('http://localhost:3000/devices')
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((devices) => {
        this.setState({devices: devices})
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _changeFilterByType(event) {
    // const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
    // dialog.open();
    this.setState({filterByType: event.target.value});
  }

  _changeSortBy(event) {
    this.setState({sortBy: event.target.value});
  }

  _filterDevices(device) {
    if (this.state.filterByType === "ALL") {
      return true;
    }
    return device.type === this.state.filterByType;
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

const Dialog = (props) => (
  <div className="mdc-dialog"
       role="alertdialog"
       aria-modal="true"
       aria-labelledby="my-dialog-title"
       aria-describedby="my-dialog-content">
    <div className="mdc-dialog__container">
      <div className="mdc-dialog__surface">
        <h2 className="mdc-dialog__title" id="my-dialog-title">Delete device?</h2>
        <div className="mdc-dialog__content" id="my-dialog-content" {...props}>
          This device will disappear from your list and will not be available anymore.
        </div>
        <footer className="mdc-dialog__actions">
          <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">Cancel</button>
          <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="accept">Delete
          </button>
        </footer>
      </div>
    </div>
    <div className="mdc-dialog__scrim"/>
  </div>
);

export default DeviceList;
