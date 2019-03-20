import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../App.css';
import { Card } from 'rebass'
// import { BrowserRouter, Link, Route} from 'react-router-dom'

import { showExhibitionInfo } from '../Redux/actions.js'

// import ExhibitionProfile from '../Containers/ExhibitionProfile'


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
      <div className='card-container'>
          <Card
            className='card'
            width={360}
            fontSize={1}
            fontWeight='bold'
            pt={2}
            pl={3}
            pr={3}
            my={5}
            bg='#f7f7f7'
            borderRadius={2}
            boxShadow='0 2px 8px rgba(0, 0, 0, 0.25)'

            onClick={() => this.props.showExhibitionInfo(this.props.exhibition)}
          >
            <div className='card-info'>
              <div>
                <h3 className="card-name">{exhibitionName}</h3><br/>
                <label className="card-area">Location: {this.props.exhibition.venue_area}</label>
              </div>
              <div>
                <h5 className="card-remaining">Days Remaining: {this.props.exhibition.days_remaining}</h5>
              </div>
            </div>
          </Card>
      </div>
    )
  }
}

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
