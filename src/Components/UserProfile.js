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

// almost there
// interestedExhibitions can be console.logged (4 Exhibition objects)
  render(){
    let interestedExhibitions = this.props.usersSavedExhibitions.map(exhib => {
      return this.props.exhibitions.find(exObj => {
        return exObj.id === exhib.exhibition_id
      })
    })


    interestedExhibitions = interestedExhibitions.filter(oneThing => oneThing !== undefined)

    let listOfSavedExhibitions
    if (this.props.usersSavedExhibitions.length > 0){
      listOfSavedExhibitions = interestedExhibitions.map(exObj => {
        return <Link to={`/index/${exObj.id}`}><ExhibitionCard key={exObj.id} exhibition={exObj}/></Link>
      })
    }


    return (
      <div>
        <h2>{this.props.loggedInUser.full_name}</h2>
        <h2>{this.props.loggedInUser.email}</h2>
        <h2>{this.props.loggedInUser.home_neighborhood}</h2>

        

        <div className='exhibition_list'>
          {listOfSavedExhibitions}
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
