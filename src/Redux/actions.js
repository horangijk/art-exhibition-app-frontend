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
    .then(user => {
      localStorage.setItem("token", user.jwt);
      dispatch(signInUser(user));
    })
    .catch(console.error)
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


// const clickHandleExhibition = (exhibObj) => ({
//   type: "SELECT_EXHIB",
//   payload: exhibObj
// })
//
// export function selectExhibitionObj(exhibObj) {
//   return (dispatch) => {
//
//   }
// }
