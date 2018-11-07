import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import DeviceList from './Devices/DeviceList';
import DeviceInput from './Devices/DeviceInput';
import './App.css';
import { allDevices } from "./Devices/DeviceServices";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      devices: undefined,
    };
    this.getDevices = this.getDevices.bind(this);
  }

  render() {
    return (
      <Router>
        <Main>
          <TopAppBar
            title='Devices'/>
          <TopAppBarFixedAdjust>
            <Content>

              <Route exact path='/'
                     component={(props) => <DeviceList devices={this.state.devices}
                                                       onDelete={this.getDevices} {...props} />}/>

              <Route exact path='/update/:deviceId'
                     component={(props) => <DeviceInput onUpdate={this.getDevices} {...props}/>}/>

              <Route exact path='/new'
                     component={(props) => <DeviceInput onCreate={this.getDevices} {...props}/>}/>

            </Content>
          </TopAppBarFixedAdjust>
        </Main>
      </Router>
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

  getDevices() {
    this.componentDidMount();
  }
}

const Main = (props) => (
  <main className='mdc-typography' {...props}>

  </main>
);

const Content = (props) => (
  <Grid>
    <Row>
      <Cell columns={12} {...props}>

      </Cell>
    </Row>
  </Grid>
);

export default App;
