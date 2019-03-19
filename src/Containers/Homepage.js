import React, { Component } from 'react'
import '../Homepage.css';
// import Slideshow from '../node_modules/uikit/src/js/components/slideshow.js'
import ExhibitionCard from '../Components/ExhibitionCard'

import { connect } from 'react-redux'
import { getExhibitions } from '../Redux/actions.js'
import { Link } from 'react-router-dom'
import { Box } from 'rebass'


class Homepage extends Component {

  componentDidMount(){
    this.props.getExhibitions()
  }

  render() {
    let allExhibitions = this.props.exhibitions.filter(exObj => {
      return exObj.days_remaining !== 0
    })

    let exhibitionList = allExhibitions.map(exObj => {
      return <Link to={`/index/${exObj.id}`} key={exObj.id}><ExhibitionCard key={exObj.id} exhibition={exObj}/></Link>
    })


    return (
      <div className='content'>
        <div className='image-container'>

          <Box
            p={5}
            fontSize={4}
            width={[ 1, 1, 1 ]}
            color='white'
            bg='gray'>
            Box

          </Box>


        </div>

        <div className='exhibition-container'>
          <div>
            <h1 className='exhibition-header'>CURRENT EXHIBITIONS</h1>
          </div>
          <div className='exhibition-list'>
            {exhibitionList}
          </div>
        </div>

      </div>

    )
  }
}



// from REDUCER
const mapStateToProps = (state) => {
  return {
    exhibitions: state.exhibitions
  }
}

// from ACTION
const mapDispatchToProps = (dispatch) => {
  return {
    getExhibitions: () => dispatch(getExhibitions())
  }
}


export default connect( mapStateToProps, mapDispatchToProps )(Homepage)
