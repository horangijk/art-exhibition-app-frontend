import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import ExhibitionProfile from '../Containers/ExhibitionProfile'
// import { Card } from 'rebass'
import '../App.css';

import { showExhibitionInfo } from '../Redux/actions.js'



class ExhibitionCard extends Component {


// const ExhibitionCard = (props) => {
//   let { exhibition, showExhibitionInfo } = props

  render() {

  let exhibitionName = this.props.exhibition.name.split(' ').map(str => {
    if (str !== "Exhibition") {
      return str + " "
    }
  })

    return (
      <div className='card-container' onClick={() => this.props.showExhibitionInfo(this.props.exhibition)}>
        <div>
          <h3 className='card-name'>{exhibitionName}</h3>
          <br/>
          <h3 className='card-location'>Location: {this.props.exhibition.venue_area}</h3>
          <br/>
        </div>
        <div className='footer'>
          <h3 className='card-days-remaining'>Days Remaining: {this.props.exhibition.days_remaining}</h3>
        </div>
      </div>
    )
  }
}

// <Card
//   className='card'
//   width={360}
//   fontSize={1}
//   fontWeight='bold'
//   pt={2}
//   pl={3}
//   pr={3}
//   my={5}
//   bg='#efede6'
//   borderRadius={2}
//   boxShadow='0 2px 8px rgba(0, 0, 0, 0.25)'
//
//   onClick={() => this.props.showExhibitionInfo(this.props.exhibition)}
// >


// from REDUCER
const mapStateToProps = (state) => {
  return {
    selectedExhibition: state.selectedExhibition
  }
}

// from ACTION
const mapDispatchToProps = (dispatch) => {
  return {
    showExhibitionInfo: (exhibition) => dispatch(showExhibitionInfo(exhibition))
  }
}



export default connect( mapStateToProps, mapDispatchToProps )(ExhibitionCard)
