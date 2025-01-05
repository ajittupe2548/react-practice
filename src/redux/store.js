import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Redux Persist configuration
const persistConfig = {
    key: 'reduxPersist', // Key to persist data under in storage
    storage, // Use localStorage
};

// Wrap the reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(logger, thunk)))

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };