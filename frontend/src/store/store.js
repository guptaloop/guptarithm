import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/root_reducer';

const configureStore = (preloadedState = {}) => (
	createStore(
		rootReducer,
		// preloadedState will help authenticate users already logged in
		preloadedState,
		// middleware lets us view state in console when dispatch actions to store
		applyMiddleware(thunk, logger)
	)
);

export default configureStore;