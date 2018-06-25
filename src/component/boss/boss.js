import React from 'react'
import { getUserList } from '../../redux/chatuser.redux'
import { connect } from 'react-redux';
import UserCard from '../usercard/usercard';

@connect(
  state => state.chatUser,
  { getUserList }
)
class Boss extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.props.getUserList('jobSeekers')
  }

  render() {
    return  <UserCard userList={this.props.userList}></UserCard>
  }
}

export default Boss