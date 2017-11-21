import React, { Component } from 'react'
import { Input, Icon } from 'antd'
import './util.less'

class EditableCell extends Component {
  state = {
    value: this.props.value,
    newVal: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const newVal = e.target.value
    this.setState({ newVal })
  }
  check = () => {
    const value = this.state.newVal
    this.setState({ editable: false, value })
    if (this.props.onCheck) {
      this.props.onCheck(value)
    }
  }
  close = () => {
    this.setState({ editable: false })
  }
  edit = () => {
    const newVal = this.state.value
    this.setState({ editable: true, newVal })
  }
  render() {
    const { value, newVal, editable } = this.state
    return (
      <div className='editable'>
        {
          editable ?
            <div className='input'>
              <Input.TextArea
                value={newVal}
                onChange={this.handleChange}
                onPressEnter={this.check}
                className='textarea'
                autosize
              />
              <Icon
                type='check'
                className='icon-check'
                onClick={this.check}
              />
              <Icon
                type='close'
                className='icon-close'
                onClick={this.close}
              />
            </div>
            :
            <div className='text'>
              {value || ' '}
              <Icon
                type='edit'
                className='edit-icon'
                onClick={this.edit}
              />
            </div>
        }
      </div>
    )
  }
}

export default EditableCell