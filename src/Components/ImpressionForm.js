import React, {Component} from 'react'
import { connect } from 'react-redux'
import { postToExhibitionImpressions } from '../Redux/actions'

class ImpressionForm extends Component {
  state = {
    user_id: this.props.loggedInUser.id,
    exhibition_id: this.props.selectedExhibition.id,
    title: "",
    content: ""
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = () => {
    this.props.postToExhibitionImpressions(this.state)
  }

// ********************
// THE CREATED IMPRESSION NEEDS TO STILL BE RENDERED ON THE EXHIBITION PAGE
// ====> write function that displays the impressions of a specific exhibition
// ********************

  render () {
    return (
      <div>
        <h2>IMPRESSION</h2>
        <form onSubmit={this.submitHandler}>
          <input type="text" name="title" value={this.state.title} onChange={this.changeHandler}/>
          <input type="text" name="content" value={this.state.content} onChange={this.changeHandler}/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
    selectedExhibition: state.selectedExhibition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postToExhibitionImpressions: (impressionObj) => dispatch(postToExhibitionImpressions(impressionObj))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(ImpressionForm)
