import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import Fab from '@material/react-fab';
import MaterialIcon from '@material/react-material-icon';
import DeviceList from './Devices/List';
import DeviceInput from './Devices/Input';

class App extends Component {
  render() {
    return (
      <Router>
        <Root>
          <TopAppBar
            title='Devices'/>
          <TopAppBarFixedAdjust>
            <Main>
              <Route exact path="/" component={DeviceList}/>
              <Route exact path="/update/:deviceId" component={DeviceInput}/>
              <Route exact path="/new" component={DeviceInput}/>
            </Main>
            <FabCreateDevice/>
          </TopAppBarFixedAdjust>
        </Root>
      </Router>
    );
  }
}

const Root = (props) => (
  <div className='mdc-typography' {...props}>

  </div>
);

const Main = (props) => (
  <div className="mdc-layout-grid max-width">
    <div className="mdc-layout-grid__inner">
      <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12" {...props}>

      </div>
    </div>
  </div>
);

const FabCreateDevice = withRouter(({props, history}) => {
  return (
    <Fab icon={<MaterialIcon icon="create"/>} onClick={() => history.push('/new')}/>
  )
});

export default App;
