import React from 'react'
import logoImage from './jobChat.png'
import './logo.css'

class Login extends React.Component {

  render() {
    return (
      <div className="logoWrapper">
        <img src={logoImage} alt="" />
      </div>
    ) 
  }
}

export default Login