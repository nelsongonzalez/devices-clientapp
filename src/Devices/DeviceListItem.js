import React, { Component } from 'react';
import MaterialIcon from '@material/react-material-icon';
import { ListItem, ListItemMeta, ListItemText } from '@material/react-list';
import { MDCDialog } from '@material/dialog';
import { deleteDevice } from './DeviceServices';

class DeviceListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      device: props.device,
      description: `${props.device.type} - ${props.device.hddCapacity} GB`
    };
    this._deleteDevice = this._deleteDevice.bind(this);
    this.onDelete = props.onDelete;
  }

  render() {
    return (
      <ListItem onClick={() => this.props.history.push(`/update/${this.state.device.id}`)}>
        <ListItemText
          primaryText={this.state.device.systemName}
          secondaryText={this.state.description}/>
        <ListItemMeta meta='delete' graphic={<MaterialIcon icon='delete'/>} onClick={(event) => {
          event.stopPropagation();
          const mdcDialog = new MDCDialog(document.querySelector('.mdc-dialog'));
          mdcDialog.listen('MDCDialog:closed', this._deleteDevice);
          mdcDialog.open();
        }}>
          <MaterialIcon icon='delete'/>
        </ListItemMeta>
      </ListItem>)
  }

  _deleteDevice(event) {
    const mdcDialog = new MDCDialog(document.querySelector('.mdc-dialog'));
    mdcDialog.unlisten('MDCDialog:closed', this._deleteDevice);
    if (event.detail.action === 'accept') {

      deleteDevice(this.state.device.id)
        .then(() => this.onDelete())
        .catch((error) => {
          console.log(error);
        });
    }
  }
}

export default DeviceListItem;
