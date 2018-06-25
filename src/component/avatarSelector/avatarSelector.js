
import React from 'react'
import { Grid, List} from 'antd-mobile'

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const avatarList = 'man,girl,fruiterer,cooker,writer,doctor, policemen,student,joker,secretary,trainer,chef,farmer,boss,engineer'
      .split(',')
      .map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }))

    const gridHeader = this.state.text ?
      <div><span>已选择头像</span><img style={{ width: 20 }} src={this.state.icon} alt="" /></div>
      : <div>请选择头像</div>

    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={elm => {
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector