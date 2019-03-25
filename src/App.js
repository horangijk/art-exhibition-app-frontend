import React, { Component, Fragment } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import Homepage from './Containers/Homepage'
import IndexPage from './Containers/IndexPage'
import LoginForm from './Components/LoginForm'
import SignupForm from './Components/SignupForm'
import UserProfile from './Components/UserProfile'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { showExhibitionInfo, getCurrentUserProfile } from './Redux/actions.js'

// import ExhibitionProfile from './Containers/ExhibitionProfile'
import { Search } from 'semantic-ui-react'


class App extends Component {

  state = {
    searchedExhibitions: this.props.exhibitions,
    checkedExhibitions: this.props.exhibitions,
    searchTerm: '',
    inputType: '',
    checkedBoxes: []
  }

  componentDidMount(){
    this.props.getCurrentUserProfile()
  }

  checkHandler = (event) => {
    this.setState({
      inputType: 'checkbox'
    })

    let checkedExhibitions = this.props.exhibitions.filter(exhib => {
        return exhib.venue_area.includes(event.target.name)
    })

    if (event.target.checked) {
      this.setState({
        checkedBoxes: [...this.state.checkedBoxes, event.target.name],
        checkedExhibitions: [...this.state.checkedExhibitions, ...checkedExhibitions]
      })
    }

    if (!event.target.checked) {
      let removedArr = this.state.checkedExhibitions.filter(exObj => {
        return !exObj.venue_area.includes(event.target.name)
      })

      let removedArrForNames = this.state.checkedBoxes.filter(venue_area => {
        return !venue_area.includes(event.target.name)
      })

      this.setState({
        inputType: 'checkbox',
        checkedExhibitions: removedArr,
        checkedBoxes: removedArrForNames
      })
    }
  }

  searchHandler = (event) => {
    let searchedExhibitions = this.props.exhibitions.filter(exhib => {
      return exhib.name.toLowerCase().includes(event.target.value)
    })
    this.setState({
      searchTerm: event.target.value,
      searchedExhibitions: searchedExhibitions,
      inputType: 'search'
    })
  }




  render() {
    return (
      <BrowserRouter>
      <Fragment>
        <div className='App'>

            <div className='navbar'>
                <div className='navbar-menu'>
                  <Link to='/home' className='navbar-options'>HOME</Link>
                  <Link to='/login' className='navbar-options'>{localStorage.token ? "PROFILE" : "LOGIN"}</Link>
                  {/*<span id='dash'>/</span>*/}
                  <Link to='/register' className='navbar-options'>{localStorage.token ? "SIGN OUT" : "REGISTER"}</Link>
                  <Link to='/index' id='index-header'>INDEX</Link>
                </div>
            </div>

            <div className='lower-half'>
              <div className='sidebar'>
                <div className='sidebar-content'>

                    <div className='search'>
                      <label className='menu-header'>Search</label>
                      <form>
                        <input type='text' value={this.state.searchTerm} onChange={this.searchHandler}/>
                        <br/>
                        <Link to='/index'><input type='submit'/></Link>
                      </form>
                    </div>

                    <div className='neighborhood-filter'>
                      <label className='menu-header'>Neighborhood</label>
                      <form className='checkbox-input'>
                        <input type="checkbox" name="Upper East Side" onChange={this.checkHandler}/>UPPER EAST SIDE<br/>
                        <input type="checkbox" name="Midtown" onChange={this.checkHandler}/>MIDTOWN<br/>
                        <input type="checkbox" name="Flatiron, Gramercy" onChange={this.checkHandler}/>FLATIRON/GRAMERCY<br/>
                        <input type="checkbox" name="Chelsea" onChange={this.checkHandler}/>CHELSEA<br/>
                        <input type="checkbox" name="Villages" onChange={this.checkHandler}/>THE VILLAGES<br/>
                        <input type="checkbox" name="Soho" onChange={this.checkHandler}/>SOHO<br/>
                        <input type="checkbox" name="Lower East Side" onChange={this.checkHandler}/>LOWER EAST SIDE<br/>
                        <input type="checkbox" name="Lower Manhattan" onChange={this.checkHandler}/>LOWER MANHATTAN<br/>
                        <input type="checkbox" name="Queens" onChange={this.checkHandler}/>QUEENS<br/>
                        <input type="checkbox" name="Harlem, Bronx" onChange={this.checkHandler}/>HARLEM/BRONX<br/>
                        <input type="checkbox" name="Williamsburg" onChange={this.checkHandler}/>WILLIAMSBURG<br/>
                        <input type="checkbox" name="Dumbo" onChange={this.checkHandler}/>DUMBO<br/>
                        <Link to='/index'><input type='submit'/></Link>
                      </form>
                    </div>

                    <div className='media-select'>
                      <label className='menu-header'>Media</label>
                      <br/>
                      <select>
                        <option >SELECT ▼</option>
                        <option >2D: Drawing</option>
                        <option >2D: Painting</option>
                        <option >2D: Photography</option>
                        <option >2D: Prints</option>
                        <option >2D: Graphics</option>
                        <option >2D: Other</option>
                        <option >3D: Sculpture</option>
                        <option >3D: Installation</option>
                        <option >3D: Furniture</option>
                        <option >3D: Product</option>
                        <option >3D: Fashion</option>
                        <option >3D: Crafts</option>
                        <option >3D: Architecture</option>
                        <option >3D: Ceramics</option>
                        <option >3D: Other</option>
                        <option >Misc: Media Arts</option>
                        <option >Misc: Performance Art</option>
                        <option >Misc: Art Talk</option>
                        <option >Screen: Digital</option>
                        <option >Screen: Video Installation</option>
                        <option >Screen: Film</option>
                      </select>
                    </div>
                </div>
              </div>

              <div className="main-container">
                <Switch>
                  <Route path='/home' component={Homepage} />
                  <Route path='/users/:id' component={UserProfile} />
                  <Route path='/login' component={LoginForm} />
                  <Route path='/register' component={SignupForm} />
                  <Route path='/index' render={()=>{
                    return <IndexPage searchedExhibitions={
                      this.state.inputType === 'checkbox' ? this.state.checkedExhibitions
                      : this.state.inputType === 'search' ? this.state.searchedExhibitions
                      : this.props.exhibitions
                    }/>
                  }} />
                </Switch>
              </div>
            </div>

        </div>
        </Fragment>
      </BrowserRouter>

    );
  }
}
// this.state.inputType === 'checkbox' ? this.state.checkedExhibitions : this.state.searchedExhibitions



// from REDUCER
const mapStateToProps = (state) => {
  return {
    selectedExhibition: state.selectedExhibition,
    exhibitions: state.exhibitions,
    loggedInUser: state.loggedInUser
  }
}

// from ACTION
const mapDispatchToProps = (dispatch) => {
  return {
    showExhibitionInfo: () => dispatch(showExhibitionInfo()),
    getCurrentUserProfile: ()=>dispatch(getCurrentUserProfile())
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(App)
