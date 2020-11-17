import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducers from '../redux/reducers';

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension
            ? window.devToolsExtension()
            : function (f) {
                return f;
            }
    )
);


export default store;