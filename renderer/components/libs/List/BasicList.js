import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List, {
  ListItem,
  ListItemText
} from 'material-ui/List'

class BasicList extends Component {
  constructor (props) {
    super()
    if (props.renderItem) {
      this._renderItem = props.renderItem
    }
  }

  render () {
    let rows = [this._renderEmptyRow()]
    if (this.props.data && this.props.data.length) {
      rows = this.props.data.map((item, index, array) => {
        return this._renderItem(item, index, array)
      })
    }
    return (
      <List dense={true}>
        {rows}
      </List>
    )
  }

  /**
   * Default rendering list items
   */
  _renderItem (item, index, array) {
    return (
      <ListItem key={index} button>
        {this.props.getText(item)}
      </ListItem>
    )
  }

  _renderEmptyRow () {
    return (
      <ListItem key={0} button>
        <ListItemText
          primary='Empty'
        />
      </ListItem>
    )
  }
}

export default BasicList
