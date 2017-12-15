import React, { Component } from 'react'
import { Input, Icon, Dropdown, Menu, Button } from 'antd'
import './util.less'

class EditableCell extends Component {
  state = {
    value: this.props.value,
    newVal: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const newVal = e.key || e.target.value
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
              {
                this.props.dropDown ?
                <Dropdown overlay={<Menu onClick={this.handleChange}>{this.props.menu}</Menu>}>
                  <Button className='dropdown'>
                    {this.props.text[newVal]} <Icon type='down' className='down'/>
                  </Button>
                </Dropdown>
                :
                this.props.textArea ?
                <Input.TextArea
                  value={newVal}
                  onChange={this.handleChange}
                  onPressEnter={this.check}
                  autosize
                />
                : 
                <Input
                  value={newVal}
                  onChange={this.handleChange}
                  onPressEnter={this.check}
                  type={this.props.type}
                />
              }
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
              {
                (
                  this.props.text && this.props.text.length ?
                  this.props.text[value]
                  :
                  value
                ) || '无'
              }
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