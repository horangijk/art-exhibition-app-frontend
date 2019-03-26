import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { showExhibitionInfo, postToSavedExhibition, getImpressions, getSavedExhibitions } from '../Redux/actions.js'
import ImpressionForm from '../Components/ImpressionForm'
import ImpressionCard from '../Components/ImpressionCard'

class ExhibitionProfile extends Component {
  componentDidMount(){
    this.props.getImpressions()
    this.props.getSavedExhibitions()
    this.props.showExhibitionInfo(this.props.exhibition)
  }


  state = {
    user_id: this.props.loggedInUser.id,
    exhibition_id: this.props.selectedExhibition.id,
    clicked: false
  }

  clickHandler = () => {
    let savedExhibitionObjArr
    if (this.props.usersSavedExhibitions) {
      savedExhibitionObjArr = this.props.usersSavedExhibitions.map(exObj1 => {
        return this.props.exhibitions.find(exObj2 => {
          return exObj2.id === exObj1.exhibition_id
        })
      })
    }

    // savedExhibitionObjArr = savedExhibitionObjArr.filter(exObj => {
    //   return exObj !== undefined
    // })

    // if (savedExhibitionObjArr.length > 0) {
      if (!savedExhibitionObjArr.includes(this.props.selectedExhibition)) {
        this.props.postToSavedExhibition({user_id: this.state.user_id, exhibition_id: this.props.exhibition.id});
      }
    // }
  }


  impressionHandler = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }


  render() {

    let exhibitionImpressions
    if (this.props.allImpressions.length > 0) {
      exhibitionImpressions = this.props.allImpressions.filter(impObj => {
        return impObj.exhibition_id === this.props.selectedExhibition.id
      })
    }

    let impressionCards
    if (exhibitionImpressions) {
      impressionCards = exhibitionImpressions.map(impObj => {
        return <ImpressionCard key={impObj.id} impressionObj={impObj}/>
      })
    }


    // let imageArr
    // if (this.props.exhibition) {
    //   imageArr = this.props.exhibition.image.map(imgObj => {
    //     return imgObj['src']
    //   })
    // }

    // imageArr = imageArr.filter(img => img !== undefined)
    //
    console.log(this.props.exhibition.image)
    console.log(this.props.loggedInUser);

    let exhibitionName
    if (this.props.exhibition) {
      exhibitionName = this.props.exhibition.name.split(' ').map(str => {
        if (str !== 'Exhibition') {
          return str + " "
        }
      })
    }

    return (
      <div className='exhibition-profile'>

        <div className='exhibition-heading'>
          <h1>{exhibitionName}</h1>
          <h1>_______________</h1>
          <div className='heading-columns'>
            <div>
              <h4>DAYS REMAINING: {this.props.exhibition.days_remaining}</h4>
            </div>
            <div className='button-container'>
              <Link to={`/users/${this.props.loggedInUser.id}`} key={this.props.loggedInUser.id}><button onClick={this.clickHandler} className='interested-button'>INTERESTED</button></Link>
            </div>
          </div>
        </div>

        <div className='exhibition-info'>
            <div>
              <label>VENUE:</label>
              <p className='exhibition-detail'>{this.props.exhibition.venue_name}</p>
              <label>ADDRESS:</label>
              <p className='exhibition-detail'>{this.props.exhibition.venue_address}</p>
              <label>PHONE:</label>
              <p className='exhibition-detail'>{this.props.exhibition.venue_phone}</p>
              <label>VENUE ACCESS:</label>
              <p className='exhibition-detail'>{this.props.exhibition.venue_access}</p>
              <label>NEIGHBORHOOD:</label>
              <p className='exhibition-detail'>{this.props.exhibition.venue_area}</p>
              <label>OPENING HOUR:</label>
              <p className='exhibition-detail'>{
                this.props.exhibition.venue_openinghour < 12
                ? `${this.props.exhibition.venue_openinghour} AM`
                : `${this.props.exhibition.venue_openinghour - 12} PM`
              }</p>
              <label>CLOSING HOUR:</label>
              <p className='exhibition-detail'>{
                this.props.exhibition.venue_closinghour < 12
                ? `${this.props.exhibition.venue_closinghour} AM`
                : `${this.props.exhibition.venue_closinghour - 12} PM`
              }</p>
              <label>PRICE:</label>
              <p className='exhibition-detail'>{this.props.exhibition.price}</p>
              <label>PERMANENT EVENT(?):</label>
              <p className='exhibition-detail'>{this.props.exhibition.permanent_event === 0 ? "YES" : "NO"}</p>
              <label>MEDIA:</label>
              <p className='exhibition-detail'>{this.props.exhibition.media}</p>
              <label>START DATE:</label>
              <p className='exhibition-detail'>{this.props.exhibition.start_date}</p>
              <label>END DATE:</label>
              <p className='exhibition-detail'>{this.props.exhibition.end_date}</p>
              <label>IMAGE:</label>
              {/*<img src={imageArr ? imageArr[-1] : null} alt="" />*/}
            </div>

            <div className='exhibition-description'>
              <label>DESCRIPTION:</label>
              <p className='exhibition-detail'>{this.props.exhibition.description}</p>
            </div>

            <div className='makeshift-dividing-line'>
              <h2>_____________________________________________</h2>
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
                ? <ImpressionForm exhibition={this.props.exhibition}/>
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
    showExhibitionInfo: (exObj) => dispatch(showExhibitionInfo(exObj)),
    postToSavedExhibition: (obj) => dispatch(postToSavedExhibition(obj)),
    getImpressions: () => dispatch(getImpressions()),
    getSavedExhibitions: () => dispatch(getSavedExhibitions()),
  }
}


export default connect( mapStateToProps, mapDispatchToProps )(ExhibitionProfile)
