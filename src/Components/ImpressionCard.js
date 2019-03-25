import React from 'react'
import { connect } from 'react-redux'

const ImpressionCard = (props) => {
  let { impressionObj } = props;

// "Tiffany's Iridescence: ..." will have an impression with "TITLE" as title
// technically, all props from ExhibitionProfile can be accessed and rendered here

// <h2>{this.props.loggedInUser}</h2>
  return (
    <div className="impression-card">
      <h2>{impressionObj.title}</h2>
      <p>{impressionObj.content}</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser
  }
}

export default connect( mapStateToProps, null )(ImpressionCard)
