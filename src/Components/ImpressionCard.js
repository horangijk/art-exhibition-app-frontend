import React from 'react'
import { connect } from 'react-redux'

const ImpressionCard = (props) => {
  let { impressionObj, users } = props;

  let foundUser
  if (users.length > 0) {
    foundUser = users.find(userObj => {
      return userObj.id === impressionObj.user_id
    })
  }

  return (
    <div className="impression-card">
      <h2>{impressionObj.title}</h2>
      <p>{impressionObj.content}</p>
      <h4>- {foundUser.full_name}, {foundUser.occupation}</h4>
    </div>
  )
}



export default connect( null, null )(ImpressionCard)
