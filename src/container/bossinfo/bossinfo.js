
import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector'

class BossInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tite: ''
    }
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {
    return (
      <div>
        <NavBar mode="dark" >Boss完善信息页面</NavBar>
        <AvatarSelector 
        selectAvatar={(imageName)=> {
          this.setState({
            avatar: imageName
          })
        }}></AvatarSelector>
        <InputItem
          onChange={v => this.onChange('tite', v)}
        >
          招聘职位
        </InputItem>
        <InputItem
          onChange={v => this.onChange('company', v)}
        >
          公司名称
        </InputItem>
        <InputItem
          onChange={v => this.onChange('money', v)}
        >
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          row={3}
          autoHeight
          title='职位要求'
        />
        <Button type="primary">保存</Button>
          
      </div>
    )
  }
}

export default BossInfo