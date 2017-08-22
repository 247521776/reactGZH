/**
 * Created by boom on 2017/8/16.
 */
import {createStore} from "redux";
import reducer from "../reducer";

const store = createStore(reducer, {
    data: []
});

export default store;