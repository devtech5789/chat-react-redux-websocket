import constants from 'constants'

const peopleReducer = (state = [], action) => {
	switch (action.type) {
	case constants.CONNECTED_NEW_USER:
		return state.concat({
			id: action.userId,
			userName: action.userName,
			avatar: action.avatar
		})

	case constants.ONLINE:
		return state.concat({
			id: action.userId,
			userName: action.userName,
			avatar: action.avatar
		})

	case constants.DISCONNECTED_USER:
		return state.filter(u => {
			return u.id !== action.userId
		})

	default:
		return state

	}
}

export default peopleReducer


