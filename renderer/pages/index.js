import {observer} from 'mobx-react';
import React, { Component } from 'react';

import App from '../components/App'
import Tracker from '../components/Tracker';

import { createMuiTheme } from 'material-ui/styles';
const theme = createMuiTheme(require('../styles/theme.js'))

@observer
class Tracking extends Component {
  render() {
    return (
      <App styles={{'-webkit-app-region': 'drag'}} theme={theme}>
        <Tracker />
      </App>
    );
  }
}

export default Tracking;