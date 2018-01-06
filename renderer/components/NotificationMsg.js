import {observer} from 'mobx-react'
import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'
import Notification from '../stores/Notification'

@observer
class NotificationMsg extends Component {
  render () {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Notification.show}
        onClose={Notification.setShow}
        autoHideDuration={this.props.time || 1000}
        message={<span id='message-id'>{Notification.message}</span>}
      />
    )
  }
}

export default NotificationMsg
