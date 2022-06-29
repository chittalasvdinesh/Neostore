import {combineReducers} from 'redux';
import { addToCart } from './Productreducer';

const reducers = combineReducers({
    addItem: addToCart
})

export default reducers;