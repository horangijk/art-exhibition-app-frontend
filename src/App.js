import React, { Component, Fragment } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import Homepage from './Containers/Homepage'
import IndexPage from './Containers/IndexPage'
import LoginForm from './Components/LoginForm'
import SignupForm from './Components/SignupForm'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { showExhibitionInfo } from './Redux/actions.js'

// import ExhibitionProfile from './Containers/ExhibitionProfile'
// import { Input, Label, Menu } from 'semantic-ui-react'


class App extends Component {
  render() {
console.log(this.props.selectedExhibition)

    return (
      <BrowserRouter>
      <Fragment>
        <div className='App'>

          <div className='navbar'>
              <div className='navbar-menu'>
                <Link to='/home' className='navbar-options'>HOME</Link>
                <Link to='/login' className='navbar-options'>LOGIN</Link>
                <Link to='/register' className='navbar-options'>REGISTER</Link>
                <Link to='/index' id='index-header'>INDEX</Link>
              </div>
          </div>


          <div className='lower-half'>
            <div className='sidebar'>

                <div className='search'>
                  <input />
                </div>

                <div className='neighborhood-filter'>
                  <label className='menu-header'>Neighborhood</label>
                  <br/><br/>
                  <form className='checkbox-input'>
                    <input type="checkbox"/>UPPER EAST SIDE<br/>
                    <input type="checkbox"/>MIDTOWN<br/>
                    <input type="checkbox"/>FLATIRON/GRAMERCY<br/>
                    <input type="checkbox"/>CHELSEA<br/>
                    <input type="checkbox"/>THE VILLAGES<br/>
                    <input type="checkbox"/>SOHO<br/>
                    <input type="checkbox"/>LOWER EAST SIDE<br/>
                    <input type="checkbox"/>LOWER MANHATTAN<br/>
                    <input type="checkbox"/>QUEENS<br/>
                    <input type="checkbox"/>HARLEM/BRONX<br/>
                    <input type="checkbox"/>WILLIAMSBURG<br/>
                    <input type="checkbox"/>DUMBO<br/>
                    <input type="submit" value="Submit"/>
                  </form>
                </div>

                <div className='media-select'>
                  <label className='menu-header'>Media</label>
                  <br/><br/>
                  <select>
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

            <div className="main-container">
              <Switch>
                <Route path='/home' component={Homepage} />
                <Route path='/login' component={LoginForm} />
                <Route path='/register' component={SignupForm} />
                <Route path='/index' component={IndexPage} />
              </Switch>
            </div>
          </div>

        </div>
        </Fragment>
      </BrowserRouter>

    );
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

export default connect( mapStateToProps, mapDispatchToProps )(App)
