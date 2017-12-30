import React, { Component } from 'react'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'

class BasicDropdown extends Component {
  render () {
    return (
      <FormControl fullWidth >
        <InputLabel htmlFor={`ids-${this.props.label}`}>{this.props.label}</InputLabel>
        <Select
          value={this.props.value}
          onChange={this.onChange}
          input={<Input id={`ids-${this.props.label}`} />}
        >
          {
            this.props['data-options'].map((option, index) => {
              return this.renderOptions(option, index)
            })
          }
        </Select>
      </FormControl>
    )
  }

  onChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.value)
    }
  }

  renderOptions (options, index) {
    return (
      <MenuItem key={index} value={index}>{options.label}</MenuItem>
    )
  }
}

export default BasicDropdown
