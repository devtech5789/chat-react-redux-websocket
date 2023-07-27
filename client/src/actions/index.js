import constants from 'constants'

export const connectedNewUser = ({userId, userName, avatar}) => {
	return {
		type: constants.CONNECTED_NEW_USER,
		userId,
		userName,
		avatar
	}
}

export const online = ({userId, userName, avatar}) => {
	return {
		type: constants.ONLINE,
		userId,
		userName,
		avatar
	}
}

export const disconnectedUser = (userId) => {
	return {
		type: constants.DISCONNECTED_USER,
		userId
	}
}

export const receiveNewMessage = ({author, text, time, color}) => {
	return {
		type: constants.RECEIVE_NEW_MESSAGE,
		author,
		text,
		time,
		color
	}
}

export const oldMessages = ({author, text, time, color}) => {
	return {
		type: constants.OLD_MESSAGES,
		author,
		text,
		time,
		color
	}
}