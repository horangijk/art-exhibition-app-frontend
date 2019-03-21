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
