import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../Redux/actions'
// import reducer from '../Redux/reducer.js'

class SignupForm extends Component {
  state = {
    full_name: "",
    email: "",
    password_digest: "",
    home_neighborhood: ""
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const newUser = this.state
    this.props.createUser(newUser)
  }

  render() {

    return (
      <div className='content'>

        <div>
          <h2>REGISTER</h2>
          <form onSubmit={this.submitHandler}>
            <label>Full Name:</label>
            <input type="text" name="full_name" value={this.state.full_name} onChange={this.changeHandler}/>
            <br/>
            <label>Email:</label>
            <input type="text" name="email" value={this.state.email} onChange={this.changeHandler}/>
            <br/>
            <label>Password:</label>
            <input type="text" name="password_digest" value={this.state.password_digest} onChange={this.changeHandler}/>
            <br/>
            <label>Hometown:</label>
            <input type="text" name="home_neighborhood" value={this.state.home_neighborhood} onChange={this.changeHandler}/>
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


// const mapStateToProps = (state) => {
//   return {
//     user: state.user
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addUser: (userObj) => dispatch(createUser(userObj))
//   }
// }


export default connect( null, {createUser} )(SignupForm)
