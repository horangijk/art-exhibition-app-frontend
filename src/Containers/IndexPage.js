import React, { Component } from 'react'
import '../App.css';
// import Slideshow from '../node_modules/uikit/src/js/components/slideshow.js'
import ExhibitionCard from '../Components/ExhibitionCard'

import { Route, Link, Switch } from 'react-router-dom'
import ExhibitionProfile from './ExhibitionProfile'

import { connect } from 'react-redux'
import { getExhibitions } from '../Redux/actions.js'
import '../App.css'


class IndexPage extends Component {

  componentDidMount(){
    this.props.getExhibitions()
  }

  render() {
    let exhibitionList
    if (this.props.searchedExhibitions.length > 0){
       exhibitionList = this.props.searchedExhibitions.map(exObj => {
        return <Link to={`/index/${exObj.id}`} key={exObj.id}><ExhibitionCard key={exObj.id} exhibition={exObj}/></Link>
      })
    }
    else {
      exhibitionList = this.props.exhibitions.map(exObj =>{
        return <Link to={`/index/${exObj.id}`} key={exObj.id}><ExhibitionCard key={exObj.id} exhibition={exObj}/></Link>
      })
    }

    return (
      <div>
        <Switch>
          <Route path={`/index/${this.props.selectedExhibition.id}`} component={ExhibitionProfile} />
          <Route path='/index' render={
            ()=>{
              return <div className='index-container'>
                  <h3 className='exhibition-header'>NYC EXHIBITIONS</h3>
                <div className='exhibition-list'>
                  {exhibitionList}
                </div>

              </div>
            }
          }/>
        </Switch>
      </div>
    )
  }
}



// from REDUCER
const mapStateToProps = (state) => {
  return {
    exhibitions: state.exhibitions,
    selectedExhibition: state.selectedExhibition
  }
}

// from ACTION
const mapDispatchToProps = (dispatch) => {
  return {
    getExhibitions: () => dispatch(getExhibitions())
  }
}


export default connect( mapStateToProps, mapDispatchToProps )(IndexPage)
