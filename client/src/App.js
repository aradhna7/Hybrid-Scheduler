import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';

import 'assets/css/nucleo-icons.css';
import 'assets/scss/blk-design-system-react.scss?v=1.2.0';
import 'assets/demo/demo.css';

import Signin from './components/Signin';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import Register from './components/Register';
import Calender from './components/Calender';
import Booking from './components/Booking';
import NumOfSlotSetting from 'components/NumOfSlotSetting';
import GetDetailsOfSlot from 'components/GetDetailsOfSlot';
import Footer from 'components/Footer/Footer';
import Index from 'views/Index';
import MySlots from 'components/MySlots';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <IndexNavbar />
        <Switch>
          <Route exact path='/' component={Index} />
          <Route exact path='/calender' component={Calender} />
          <Route exact path='/booking/:date' component={Booking} />
          <Route exact path='/setnumslots' component={NumOfSlotSetting} />
          <Route exact path='/getnumslots' component={GetDetailsOfSlot} />
          <Route exact path='/login' component={Signin} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/myslots' component={MySlots} />
          {/* <Redirect from='/' to='/' /> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
