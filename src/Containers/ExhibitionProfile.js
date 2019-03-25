import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { showExhibitionInfo, postToSavedExhibition, getImpressions, getSavedExhibitions } from '../Redux/actions.js'
import ImpressionForm from '../Components/ImpressionForm'
import ImpressionCard from '../Components/ImpressionCard'

class ExhibitionProfile extends Component {
  componentDidMount(){
    // this.props.showExhibitionInfo()
    this.props.getImpressions()
    this.props.getSavedExhibitions()
  }

  state = {
    user_id: this.props.loggedInUser.id,
    exhibition_id: this.props.selectedExhibition.id,
    clicked: false
  }

  clickHandler = () => {
    let savedExhibitionObjArr = this.props.usersSavedExhibitions.map(exObj1 => {
      return this.props.exhibitions.find(exObj2 => {
        return exObj2.id === exObj1.exhibition_id
      })
    })

    // savedExhibitionObjArr = savedExhibitionObjArr.filter(exObj => {
    //   return exObj !== undefined
    // })

    // if (savedExhibitionObjArr.length > 0) {
      if (!savedExhibitionObjArr.includes(this.props.selectedExhibition)) {
        this.props.postToSavedExhibition({user_id: this.state.user_id, exhibition_id: this.state.exhibition_id});
      }
    // }

    console.log(savedExhibitionObjArr)
  }


  impressionHandler = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }


  render() {

    let exhibitionImpressions = this.props.allImpressions.filter(impObj => {
      return impObj.exhibition_id === this.props.selectedExhibition.id
    })

    let impressionCards = exhibitionImpressions.map(impObj => {
      return <ImpressionCard key={impObj.id} impressionObj={impObj}/>
    })


    // let imageArr
    // if (this.props.selectedExhibition.image.length > 0) {
    //   imageArr = this.props.selectedExhibition.image.map(imgObj => {
    //     return imgObj['src']
    //   })
    //
    // }
    // imageArr = imageArr.filter(img => img !== undefined)
    //
    // console.log(imageArr)

    let exhibitionName = this.props.selectedExhibition.name.split(' ').map(str => {
      if (str !== 'Exhibition') {
        return str + " "
      }
    })

    return (
      <div className='exhibition-profile'>

        <div className='exhibition-heading'>
          <h1>{exhibitionName}</h1>
          <h1>_______________</h1>
          <div className='heading-columns'>
            <div>
              <h4>DAYS REMAINING: {this.props.selectedExhibition.days_remaining}</h4>
            </div>
            <div className='button-container'>
              <Link to={`/users/${this.props.loggedInUser.id}`} key={this.props.loggedInUser.id}><button onClick={this.clickHandler} className='interested-button'>INTERESTED</button></Link>
            </div>
          </div>
        </div>

        <div className='exhibition-info'>
            <div>
              <label>VENUE:</label>
              <p className='exhibition-detail'>{this.props.selectedExhibition.venue_name}</p>
              <label>ADDRESS:</label>
              <p className='exhibition-detail'>{this.props.selectedExhibition.venue_address}</p>
              <label>PHONE:</label>
              <p className='exhibition-detail'>{this.props.selectedExhibition.venue_phone}</p>
              <label>VENUE ACCESS:</label>
              <p className='exhibition-detail'>{this.props.selectedExhibition.venue_access}</p>
              <label>NEIGHBORHOOD:</label>
              <p className='exhibition-detail'>{this.props.selectedExhibition.venue_area}</p>
              <label>OPENING HOUR:</label>
              <p className='exhibition-detail'>{
                this.props.selectedExhibition.venue_openinghour < 12
                ? `${this.props.selectedExhibition.venue_openinghour} AM`
                : `${this.props.selectedExhibition.venue_openinghour - 12} PM`
              }</p>
              <label>CLOSING HOUR:</label>
              <p className='exhibition-detail'>{
                this.props.selectedExhibition.venue_closinghour < 12
                ? `${this.props.selectedExhibition.venue_closinghour} AM`
                : `${this.props.selectedExhibition.venue_closinghour - 12} PM`
              }</p>
              <label>PRICE:</label>
              <p className='exhibition-detail'>{this.props.selectedExhibition.price}</p>
              <label>PERMANENT EVENT(?):</label>
              <p className='exhibition-detail'>{this.props.selectedExhibition.permanent_event === 0 ? "YES" : "NO"}</p>
              <label>MEDIA:</label>
              <p className='exhibition-detail'>{this.props.selectedExhibition.media}</p>
              <label>START DATE:</label>
              <p className='exhibition-detail'>{this.props.selectedExhibition.start_date}</p>
              <label>END DATE:</label>
              <p className='exhibition-detail'>{this.props.selectedExhibition.end_date}</p>
              <label>IMAGE:</label>
            </div>

            <div className='exhibition-description'>
              <label>DESCRIPTION:</label>
              <p className='exhibition-detail'>{this.props.selectedExhibition.description}</p>
            </div>
        </div>


        <div className='impressions'>
          <div className="first-row">
            <div>
              <h2>IMPRESSIONS</h2>
            </div>

            <div>
              <button onClick={this.impressionHandler}>LEAVE IMPRESSION</button>
            </div>
          </div>

          <div className="second-row">
            <div>
              {impressionCards}
            </div>

            <div>
              {
                this.state.clicked === true
                ? <ImpressionForm />
                : null
              }
            </div>
          </div>

        </div>

      </div>
    )
  }
}


// from REDUCER
const mapStateToProps = (state) => {
  return {
    exhibitions: state.exhibitions,
    selectedExhibition: state.selectedExhibition,
    loggedInUser: state.loggedInUser,
    allImpressions: state.allImpressions,
    usersSavedExhibitions: state.usersSavedExhibitions
  }
}

// from ACTION
const mapDispatchToProps = (dispatch) => {
  return {
    showExhibitionInfo: () => dispatch(showExhibitionInfo()),
    postToSavedExhibition: (obj) => dispatch(postToSavedExhibition(obj)),
    getImpressions: () => dispatch(getImpressions()),
    getSavedExhibitions: () => dispatch(getSavedExhibitions())
  }
}


export default connect( mapStateToProps, mapDispatchToProps )(ExhibitionProfile)
