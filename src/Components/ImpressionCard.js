import React from 'react'
import { connect } from 'react-redux'

const ImpressionCard = (props) => {
  let { impressionObj, loggedInUser } = props;

  return (
    <div className="impression-card">
      <h2>{impressionObj.title}</h2>
      <p>{impressionObj.content}</p>
      <h4>- {loggedInUser.full_name}, {loggedInUser.occupation}</h4>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser
  }
}

export default connect( mapStateToProps, null )(ImpressionCard)
