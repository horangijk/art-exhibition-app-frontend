import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getSavedExhibitions, getExhibitions } from '../Redux/actions.js'
import ExhibitionCard from '../Components/ExhibitionCard'
import { Link } from 'react-router-dom'

class UserProfile extends Component {
  componentDidMount() {
    this.props.getSavedExhibitions()
    this.props.getExhibitions()
  }


  render(){
    let interestedExhibitions
    if (this.props.usersSavedExhibitions.length > 0) {
      interestedExhibitions = this.props.usersSavedExhibitions.map(exhib => {
        return this.props.exhibitions.find(exObj => {
          return exObj.id === exhib.exhibition_id
        })
      })
      interestedExhibitions = interestedExhibitions.filter(exObj => exObj !== undefined)
    }


    let listOfSavedExhibitions
    if (this.props.usersSavedExhibitions.length > 0){
      listOfSavedExhibitions = interestedExhibitions.map(exObj => {
        return <Link to={`/index/${exObj.id}`}><ExhibitionCard key={exObj.id} exhibition={exObj}/></Link>
      })
    }

    return (
      <div>

        <div className='user-info'>
          <div className='user-name'>
            <h2 className='user-name-header'>{this.props.loggedInUser.full_name}</h2>
          </div>

          <div className='user-details'>
            <label>OCCUPATION:</label>
            <h2>{this.props.loggedInUser.occupation}</h2>
            <label>HOME NEIGHBORHOOD:</label>
            <h2>{this.props.loggedInUser.home_neighborhood}</h2>
          </div>
        </div>


        <div className='exhibition-container'>
          <div>
            <h1 className='exhibition-header'>SAVED EXHIBITIONS</h1>
          </div>
          <div className='exhibition-list'>
            {listOfSavedExhibitions}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
    exhibitions: state.exhibitions,
    usersSavedExhibitions: state.usersSavedExhibitions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExhibitions: () => dispatch(getExhibitions()),
    getSavedExhibitions: () => dispatch(getSavedExhibitions())
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(UserProfile)
