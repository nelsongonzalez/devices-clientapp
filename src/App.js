import React, { Component } from 'react';
import './App.css';
import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import DeviceList from './Devices/List';
import DeviceInput from './Devices/Input';

class App extends Component {
  render() {
    return (
      <div className='mdc-typography'>
        <TopAppBar
          title='Devices'/>
        <TopAppBarFixedAdjust>
          <DeviceList/>
          <DeviceInput/>
        </TopAppBarFixedAdjust>
      </div>
    );
  }
}

export default App;
