import React, { Component } from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'

class BasicTabs extends Component {
  render () {
    return (
      <Tabs onChange={this.onChange}{...this.props}>
        {
          this.props['data-tabs'].map((tab, index) => {
            return this.renderTab(tab, index)
          })
        }
      </Tabs>
    )
  }

  onChange (event, value) {
    if (this.props.onChange) {
      this.props.onChange(this.props.tabs[value], value)
    }
  }

  renderTab (options, index) {
    return (
      <Tab key={index} {...options} />
    )
  }
}

export default BasicTabs
