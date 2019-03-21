// mapStateToProps

const initialState = {
  exhibitions: [],
  user: {},
  loggedInUser: {},
  selectedExhibition: {},
  filteredExhibitions: [],
  searchTerm: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "LOAD_EXHIBITIONS": {
      return {...state, exhibitions: action.payload}
    }

    case "ADD_USER": {
      return {...state, user: action.payload}
    }

    case "SIGN_IN_USER": {
      return {...state, loggedInUser: action.payload}
    }

    case "GET_EXHIB_INFO": {
      return {...state, selectedExhibition: action.payload}
    }

    case "FILTER_EXHIBITIONS": {
      return {...state, filteredExhibitions: action.payload}
    }

    case "SHOW_USER_PROFILE": {
      return {...state, loggedInUser: action.payload}
    }

    default:
      return state
  }

}

export default reducer
