import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './../reducers/index'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootsaga from '../sagas/index'

const composeEnhancers = process.env.NODE_ENV !== 'production' && 
typeof window === 'object' && 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    shouldHotReload: false,
}) : compose;

const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
 const middlewares = [
    // thunk,
    sagaMiddleware
 ];
 const ehancers = [
     applyMiddleware(...middlewares)
 ]
 const store = createStore(rootReducer, composeEnhancers(...ehancers));
 sagaMiddleware.run(rootsaga);
    return store;
}

export default configureStore