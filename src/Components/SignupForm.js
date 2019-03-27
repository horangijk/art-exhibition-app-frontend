import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../Redux/actions'
import { Redirect } from 'react-router-dom'
// import reducer from '../Redux/reducer.js'

class SignupForm extends Component {
  state = {
    full_name: "",
    email: "",
    password: "",
    occupation: "",
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
    return <Redirect to='/home'/>
  }

  render() {
    if (!!localStorage.token){
      localStorage.clear()
      return <Redirect to='/home'/>
    }


    return (
      <div className='login-container'>

        <div>
        </div>

        <div className='login'>
          <h2>REGISTER</h2>
          <form onSubmit={this.submitHandler}>
            <label>Full Name</label>
            <input type="text" name="full_name" value={this.state.full_name} onChange={this.changeHandler}/>
            <br/>
            <label>Email</label>
            <input type="text" name="email" value={this.state.email} onChange={this.changeHandler}/>
            <br/>
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.changeHandler}/>
            <br/>
            <label>Occupation</label>
            <input type="text" name="occupation" value={this.state.occupation} onChange={this.changeHandler}/>
            <br/>
            <label>Hometown</label>
            <input type="text" name="home_neighborhood" value={this.state.home_neighborhood} onChange={this.changeHandler}/>
            <br/>
            <input type="submit" className="form-submit"/>
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
const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (userObj) => dispatch(createUser(userObj))
  }
}


export default connect( null, mapDispatchToProps )(SignupForm)
