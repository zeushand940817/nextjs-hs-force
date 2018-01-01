import {observer} from 'mobx-react';
import React, { Component } from 'react';

import withRoot from '../components/withRoot';
import Tracker from '../components/Tracker';

@observer
class Tracking extends Component {
  render() {
    return (
      <Tracker />
    )
  }
}

export default withRoot(Tracking)
