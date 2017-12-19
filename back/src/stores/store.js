import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { auth } from './reducers';

export const store = createStore(auth, applyMiddleware(thunk))