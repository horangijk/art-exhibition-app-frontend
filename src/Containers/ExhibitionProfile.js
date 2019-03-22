import React, {Component} from 'react'
import { connect } from 'react-redux'
import { showExhibitionInfo, postToSavedExhibition } from '../Redux/actions.js'
import ImpressionForm from '../Components/ImpressionForm'
import ImpressionCard from '../Components/ImpressionCard'

class ExhibitionProfile extends Component {
  componentDidMount(){
    // this.props.showExhibitionInfo()
    this.props.getImpressions()
  }

  state = {
    user_id: this.props.loggedInUser.id,
    exhibition_id: this.props.selectedExhibition.id,
    clicked: false
  }

  clickHandler = () => {
    this.props.postToSavedExhibition(this.state)
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
    console.log(impressionCards)

    // let imageArr = this.props.selectedExhibition.image.map(imgObj => {
    //   return imgObj['src']
    // })
    // console.log(imageArr);

    return (
      <div>
        <h1>{this.props.selectedExhibition.name}</h1>
        <h4>DAYS REMAINING: {this.props.selectedExhibition.days_remaining}</h4>
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
        <label>DESCRIPTION:</label>
        <p className='exhibition-detail'>{this.props.selectedExhibition.description}</p>
        <label>MEDIA:</label>
        <p className='exhibition-detail'>{this.props.selectedExhibition.media}</p>
        <label>START DATE:</label>
        <p className='exhibition-detail'>{this.props.selectedExhibition.start_date}</p>
        <label>END DATE:</label>
        <p className='exhibition-detail'>{this.props.selectedExhibition.end_date}</p>
        <label>IMAGE:</label>
        <img src={
          this.props.selectedExhibition.length > 0
          ? this.props.selectedExhibition.image[-1]['src']
          : 'https://www.tate.org.uk/sites/default/files/styles/grid-normal-12-cols/public/images/caspar_david_friedrich_monk_by_sea.jpg?itok=Ib0aq6Ww'
        } alt=""/>

        <button onClick={this.clickHandler}>INTERESTED</button>


        <h2>IMPRESSIONS</h2>
        {impressionCards}

        <button onClick={this.impressionHandler}>Leave an Impression</button>
        {
          this.state.clicked === true
          ? <ImpressionForm />
          : null
        }
      </div>
    )
  }
}


// from REDUCER
const mapStateToProps = (state) => {
  return {
    selectedExhibition: state.selectedExhibition,
    loggedInUser: state.loggedInUser,
    allImpressions: state.allImpressions
  }
}

// from ACTION
const mapDispatchToProps = (dispatch) => {
  return {
    showExhibitionInfo: () => dispatch(showExhibitionInfo()),
    postToSavedExhibition: (obj) => dispatch(postToSavedExhibition(obj))
  }
}


export default connect( mapStateToProps, mapDispatchToProps )(ExhibitionProfile)
