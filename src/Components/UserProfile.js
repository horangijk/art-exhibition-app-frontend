import React, {Component} from 'react'
import { connect } from 'react-redux'
// import {  } from '../Redux/actions.js'

class UserProfile extends Component {
  render(){
    return (
      <div>
        <h2>{this.props.loggedInUser.full_name}</h2>
        <h2>{this.props.loggedInUser.email}</h2>
        <h2>{this.props.loggedInUser.home_neighborhood}</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser
  }
}

export default connect( mapStateToProps, null )(UserProfile)
