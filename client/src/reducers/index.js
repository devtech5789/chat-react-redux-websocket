import { combineReducers } from 'redux'
import messagesReducer from 'reducers/messages'
import peopleReducer from 'reducers/people'

const chatReducer = combineReducers({
	messagesReducer,
	peopleReducer
})

export default chatReducer