import { applyMiddleware, createStore } from 'redux'

import reducers from './reducers/'

// import logger from 'redux-logger'
import thunk from 'redux-thunk'

// const middleware = applyMiddleware(thunk, logger())
const middleware = applyMiddleware(thunk)

export default createStore(reducers, middleware)
