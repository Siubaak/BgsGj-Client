import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'antd'
import img403 from '../../assets/img/403.svg'
import img404 from '../../assets/img/404.svg'
import './util.less'

const config = {
  '403': {
    img: img403,
    des: '无权访问该页面',
  },
  '404': {
    img: img404,
    des: '访问页面不存在',
  },
}

class Exce extends Component {
  render() {
    return (
      <div className='exce'>
        <img className='img' src={config[this.props.type] ? config[this.props.type].img : config[404].img} alt='exce'></img>
        <p className='des'>
          {config[this.props.type] ? config[this.props.type].des : config[404].des}
        </p>
        <Link to='/' className='button'>
          <Button type='primary'>
            <Icon type="left" />返回首页
          </Button>
        </Link>
      </div>
    )
  }
}

export default Exce