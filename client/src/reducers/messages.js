import constants from 'constants'


const messagesReducer = (state = [], action) => {
	switch (action.type) {
	case constants.RECEIVE_NEW_MESSAGE:
		return state.concat({
			author: action.author,
			text: action.text,
			time: action.time,
			color: action.color
		})

	case constants.OLD_MESSAGES:
		return state.concat({
			author: action.author,
			text: action.text,
			time: action.time,
			color: action.color
		})

	default:
		return state

	}
}

export default messagesReducer