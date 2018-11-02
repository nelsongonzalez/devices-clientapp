import React, { Component } from 'react';
import Select from '@material/react-select';
import MaterialIcon from '@material/react-material-icon';
import 'material-design-icons/index'

class DeviceList extends Component {

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
      <div>
        <div>
          <Select
            label='Device type'
            value={this.state.deviceType}
            outlined
            onChange={this.changeDeviceType}>
            <option value='ww'>Windows Workstation</option>
            <option value='ws'>Windows Server</option>
            <option value='m'>Mac</option>
          </Select>
          <Select
            label='Sort by'
            value={this.state.sortBy}
            outlined
            onChange={this.changeSortBy}>
            <option value='hddc'>HDD Capacity</option>
          </Select>
        </div>
        <div>
          <ul className="mdc-list mdc-list--two-line" aria-orientation="vertical">
            <li className="mdc-list-item">
              <span className="mdc-list-item__text">
                <span className="mdc-list-item__primary-text">SUSAN-DESKTOP</span>
                <span className="mdc-list-item__secondary-text">Windows Workstatop, 128GB</span>
              </span>
              <MaterialIcon className="mdc-list-item__meta material-icons" icon='menu' />
            </li>
            <li className="mdc-list-item">
              <span className="mdc-list-item__text">
                <span className="mdc-list-item__primary-text">MAC-LOCAL-FREDY</span>
                <span className="mdc-list-item__secondary-text">Mac, 256GB</span>
              </span>
              <MaterialIcon className="mdc-list-item__meta material-icons" icon='menu' />
              {/*<a className="mdc-list-item__meta material-icons" href="#"*/}
                 {/*aria-label="Remove from favorites" title="Remove from favorites"*/}
                 {/*onClick="event.preventDefault();">*/}
                {/*favorite*/}
              {/*</a>*/}
            </li>
          </ul>
        </div>
      </div>
    );
  }

  changeDeviceType(e) {
    this.setState({type: e.target.deviceType});
  }

  changeSortBy(e) {
    this.setState({type: e.target.sortBy});
  }

}

export default DeviceList;
