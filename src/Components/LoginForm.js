import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../Redux/actions'

import { Redirect } from 'react-router-dom'
// import UserProfile from './UserProfile'



class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    let currentUser = this.state
    this.props.getCurrentUser(currentUser)
  }


  render() {

    if (!!localStorage.token){
      return <Redirect to={`/users/${this.props.loggedInUser.id}`}/>
    }

    return (

      <div className='content'>
        <div>
          <h2>LOGIN</h2>
          <form onSubmit={this.submitHandler}>
            <label>Email:</label>
            <input type="text" name="email" value={this.state.email} onChange={this.changeHandler}/>
            <br/>
            <label>Password:</label>
            <input type="text" name="password" value={this.state.password} onChange={this.changeHandler}/>
            <br/>
            <input type="submit"/>
          </form>
        </div>

        <div>
        </div>

      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: (userObj) => dispatch(getCurrentUser(userObj))
  }
}


export default connect( mapStateToProps, mapDispatchToProps)(LoginForm)
