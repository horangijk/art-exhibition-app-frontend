import React, {Component} from 'react'
import { connect } from 'react-redux'
import { showExhibitionInfo } from '../Redux/actions.js'

class ExhibitionProfile extends Component {
  componentDidMount(){
    this.props.showExhibitionInfo()
  }

  render() {
    let imageArr = this.props.selectedExhibition.image.map(imgObj => {
      return imgObj['src']
    })
    console.log(imageArr);

    return (
      <div>
        <h1>{this.props.selectedExhibition.name}</h1>
        <h4>DAYS REMAINING: {this.props.selectedExhibition.days_remaining}</h4>
        <label>VENUE:</label>
        <p>{this.props.selectedExhibition.venue_name}</p>
        <label>ADDRESS:</label>
        <p>{this.props.selectedExhibition.venue_address}</p>
        <label>PHONE:</label>
        <p>{this.props.selectedExhibition.venue_phone}</p>
        <label>VENUE ACCESS:</label>
        <p>{this.props.selectedExhibition.venue_access}</p>
        <label>NEIGHBORHOOD:</label>
        <p>{this.props.selectedExhibition.venue_area}</p>
        <label>OPENING HOUR:</label>
        <p>{
          this.props.selectedExhibition.venue_openinghour < 12
          ? `${this.props.selectedExhibition.venue_openinghour} AM`
          : `${this.props.selectedExhibition.venue_openinghour - 12} PM`
        }</p>
        <label>CLOSING HOUR:</label>
        <p>{
          this.props.selectedExhibition.venue_closinghour < 12
          ? `${this.props.selectedExhibition.venue_closinghour} AM`
          : `${this.props.selectedExhibition.venue_closinghour - 12} PM`
        }</p>
        <label>PRICE:</label>
        <p>{this.props.selectedExhibition.price}</p>
        <label>PERMANENT EVENT(?):</label>
        <p>{this.props.selectedExhibition.permanent_event === 0 ? "YES" : "NO"}</p>
        <label>DESCRIPTION:</label>
        <p>{this.props.selectedExhibition.description}</p>
        <label>MEDIA:</label>
        <p>{this.props.selectedExhibition.media}</p>
        <label>START DATE:</label>
        <p>{this.props.selectedExhibition.start_date}</p>
        <label>END DATE:</label>
        <p>{this.props.selectedExhibition.end_date}</p>

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
    showExhibitionInfo: () => dispatch(showExhibitionInfo())
  }
}


export default connect( mapStateToProps, mapDispatchToProps )(ExhibitionProfile)
