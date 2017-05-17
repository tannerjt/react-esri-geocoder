import {
  UPDATE_USER_INPUT,
  UPDATE_GEOCODER_SUGGESTIONS,
  SHOW_LOADING,
  FOUND_ADDRESS,
} from '../actions/location-actions'

const initialState = {
  placeholder: 'ex: 635 Capital St NE, Salem OR',
  userInput:'',
  result: undefined,
  loading: false,
  suggestions: [],
}

const locationReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_USER_INPUT:
      return { ...state, userInput: action.input}
    case UPDATE_GEOCODER_SUGGESTIONS:
      return { ...state, suggestions: action.suggestions, loading: false}
    case SHOW_LOADING:
      return { ...state, loading: action.status}
    case FOUND_ADDRESS:
      return { ...state, result: action.result, loading: false, error: null}
    default:
      return state
  }
}

export default locationReducer
