import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import projectReducer from './project/project.reducer';
import chatReducer from './chat/chat.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
    chat: chatReducer
})

export default rootReducer;