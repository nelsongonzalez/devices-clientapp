import React, { Component } from 'react';
import MaterialIcon from '@material/react-material-icon';
import { ListItem, ListItemMeta, ListItemText } from '@material/react-list';
import { MDCDialog } from '@material/dialog';
import { deleteDevice } from './DeviceServices';

class DeviceListItem extends Component {

  constructor(props) {
    super(props);
    this.state = props.props;
    this.state.description = `${props.props.type} - ${props.props.hddCapacity} GB`;
    this._deleteDevice = this._deleteDevice.bind(this);
  }

  render() {
    return (
      <ListItem onClick={() => this.props.props.history.push(`/update/${this.state.id}`)}>
        <ListItemText
          primaryText={this.state.systemName}
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
    console.log(this.props);
    if (event.detail.action === 'accept') {

      deleteDevice(this.state.id)
        .then((response) => console.log(response))
        .catch((error) => {
          console.log(error);
        });
    }
    this.props.props.history.replace('/');
  }
}

export default DeviceListItem;
