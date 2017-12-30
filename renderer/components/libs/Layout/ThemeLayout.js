import React, { Component } from 'react'
import { MuiThemeProvider } from 'material-ui/styles'

class ThemeLayout extends Component {
  render () {
    return (
      <MuiThemeProvider theme={this.props.theme}>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default ThemeLayout
