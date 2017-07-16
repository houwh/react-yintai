/**
 * Created by Administrator on 2017/6/13.
 */
import {createStore,combineReducers,applyMiddleware} from "redux";
import * as Reducers from "../reducers/reducers";
import thunkMiddleware from "redux-thunk";

const apps = combineReducers(Reducers);

const store = createStore(
    apps,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware));

export default store;