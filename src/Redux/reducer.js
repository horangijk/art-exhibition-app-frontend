// mapStateToProps

const initialState = {
  exhibitions: [],
  user: {},
  loggedInUser: {},
  selectedExhibition: {},
  filteredExhibitions: [],
  searchTerm: '',
  savedExhibitions: [],
  usersSavedExhibitions: [],
  createdImpression: {},
  allImpressions: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "LOAD_EXHIBITIONS": {
      return {...state, exhibitions: action.payload}
    }

    case "ADD_USER": {
      return {...state, user: action.payload}
    }

    case "LOAD_USERS": {
      return {...state, allUsers: action.payload}
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

    case "SAVE_EXHIB": {
      return {...state, usersSavedExhibitions: [...state.usersSavedExhibitions, action.payload]}
    }

    case "CREATE_IMPRESSION": {
      return {...state, allImpressions: [...state.allImpressions, action.payload]}
    }

    case "LOAD_IMPRESSIONS": {
      return {...state, allImpressions: action.payload}
    }

    case "REMOVE_SAVED_EXHIBITION": {
      let newArr = state.savedExhibitions.filter(exhib => {
        return exhib !== action.payload
      })

      return {...state, usersSavedExhibitions: newArr}
    }


    case "LOAD_SAVED_EXHIBITIONS": {
      return {...state, usersSavedExhibitions: action.payload}
    }

    default:
      return state
  }

}

export default reducer
