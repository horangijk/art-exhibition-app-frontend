// mapDispatchToProps

// EXHIBITIONS ----------------------------------------
const loadExhibitions = (exhibitions) => ({
  type: "LOAD_EXHIBITIONS",
  payload: exhibitions
})

export const getExhibitions = () => dispatch => {
  return fetch('http://localhost:3000/api/v1/exhibitions')
    .then(res => res.json())
    .then(data => dispatch(loadExhibitions(data)))
    .catch(console.error)
}


// -----------------------------------------------------



// USERS ----------------------------------------
const addUser = (user) => ({
  type: "ADD_USER",
  payload: user
})

export function createUser(userObj) {

  return (dispatch) => {
    return fetch('http://localhost:3000/api/v1/users',{
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({user: userObj})
    })
      .then(res => res.json())
      .then(user => {
        localStorage.setItem("token", user.jwt);
        dispatch(addUser(user));
      })
      .catch(console.error)
  }
}


const signInUser = (user) => ({
  type: "SIGN_IN_USER",
  payload: user
})

export function getCurrentUser(userObj) {
  return (dispatch) => {
    // let token = localStorage.token
    return fetch('http://localhost:3000/api/v1/login',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({user: userObj})
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.jwt);
      dispatch(signInUser(data.user));

    })
    .catch(console.error)
  }
}


const showUserProfile = (user) => ({
  type: "SHOW_USER_PROFILE",
  payload: user
})

export const getCurrentUserProfile = userObj => {
  return (dispatch) => {
    if (localStorage.token) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
          "Accept" : "application/json",
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        // console.log("data:", data);
        // dispatch(showUserProfile(data.user.email))
        dispatch(showUserProfile(data.user));
      })
    }
  }
}


const getExhibitionInfo = (exhibObj) => ({
  type: "GET_EXHIB_INFO",
  payload: exhibObj
})

export function showExhibitionInfo(exhibObj) {
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/exhibitions/${exhibObj.id}`)
      .then(res => res.json())
      .then(exhibition => {
        dispatch(getExhibitionInfo(exhibition))
      })
  }
}


const saveExhibition = (obj) => ({
  type: "SAVE_EXHIB",
  payload: obj
})

export function postToSavedExhibition(obj) {
  console.log(obj);
  return (dispatch) => {
    return fetch('http://localhost:3000/api/v1/saved_exhibitions', {
      method: "POST",
      headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({saved_exhibition: obj})
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch(saveExhibition(data))
      })
      .catch(console.error)
  }
}


// LEFT OFF HERE
// FIX BACKGROUND IMAGE ON HOMEPAGE

const loadSavedExhibitions = (exhibitions) => ({
  type: "LOAD_SAVED_EXHIBITIONS",
  payload: exhibitions
})

export function getSavedExhibitions(exhibitions) {
  return (dispatch) => {
    return fetch('http://localhost:3000/api/v1/saved_exhibitions')
      .then(res => res.json())
      .then(data => {
        dispatch(loadSavedExhibitions(data))
      })
  }
}


const createImpression = (impressionObj) => ({
  type: "CREATE_IMPRESSION",
  payload: impressionObj
})

export function postToExhibitionImpressions(impressionObj) {
  return (dispatch) => {
    return fetch('http://localhost:3000/api/v1/impressions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({impression: impressionObj})
    })
      .then(res => res.json())
      .then(impression => dispatch(createImpression(impression)))
  }
}

const loadAllImpressions = (impressions) => ({
  type: "LOAD_IMPRESSIONS",
  payload: impressions
})

export function getImpressions(impressions) {
  return (dispatch) => {
    return fetch('http://localhost:3000/api/v1/impressions')
      .then(res => res.json())
      .then(data => dispatch(loadAllImpressions(data)))
  }
}
