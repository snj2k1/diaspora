import { combineReducers } from 'redux';

import {chatReducer} from './chat/reducer';
import {searchReducer} from './search/reducer';

export const rootReducer =  combineReducers({
    chat: chatReducer,
    search: searchReducer,
});