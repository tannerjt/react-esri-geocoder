import { combineReducers } from 'redux'

import locationReducer from './location-reducers'

export default combineReducers({
  location: locationReducer,
})
