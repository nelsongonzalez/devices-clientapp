import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Select from '@material/react-select';
import MaterialIcon from '@material/react-material-icon';

class DeviceList extends Component {

  state = {
    devices: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      deviceType: 'ww',
      sortBy: 'hddc',
    };
    this.changeDeviceType = this.changeDeviceType.bind(this);
    this.changeSortBy = this.changeSortBy.bind(this);
  }

  render() {
    return (
      <Root>
        <Grid>
          <GridContent>
            <GridCell>
              <Select label='Device type' value={this.state.deviceType} outlined onChange={this.changeDeviceType}>
                <option value='ww'>Windows Workstation</option>
                <option value='ws'>Windows Server</option>
                <option value='m'>Mac</option>
              </Select>
              <Select label='Sort by' value={this.state.sortBy} outlined onChange={this.changeSortBy}>
                <option value='hddc'>HDD Capacity</option>
              </Select>
            </GridCell>
          </GridContent>
          <GridContent>
            <List>
              {this.state.devices ? (
                this.state.devices.map((device) => (
                  <ListItem key={device.id} props={{
                    systemName: device["system_name"],
                    type: device.type,
                    hddCapacity: device["hdd_capacity"]
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
        this.setState({devices: devices})
      });
  };

  changeDeviceType(e) {
    this.setState({type: e.target.deviceType});
  }

  changeSortBy(e) {
    this.setState({type: e.target.sortBy});
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
    <li className="mdc-list-item" onClick={() => history.push('/input')}>
      <span className="mdc-list-item__text">
        <span className="mdc-list-item__primary-text">{props.systemName}</span>
        <span className="mdc-list-item__secondary-text">{props.type} - {props.hddCapacity}GB</span>
      </span>
      <MaterialIcon className="mdc-list-item__meta material-icons" icon='more_vert'/>
    </li>)
});

export default DeviceList;
