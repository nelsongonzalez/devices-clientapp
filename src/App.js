import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import Fab from '@material/react-fab';
import MaterialIcon from '@material/react-material-icon';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import DeviceList from './Devices/DeviceList';
import DeviceInput from './Devices/DeviceInput';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Main>
          <TopAppBar
            title='Devices'/>
          <TopAppBarFixedAdjust>
            <Content>
              <Route exact path='/' component={DeviceList}/>
              <Route exact path='/update/:deviceId' component={DeviceInput}/>
              <Route exact path='/new' component={DeviceInput}/>
            </Content>
            <FabCreateDevice/>
          </TopAppBarFixedAdjust>
        </Main>
      </Router>
    );
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

const FabCreateDevice = withRouter(({props, history}) => {
  return (
    <Fab icon={<MaterialIcon icon='create'/>} onClick={() => history.push('/new')}/>
  )
});

export default App;
