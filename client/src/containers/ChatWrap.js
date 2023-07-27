import React, { Component } from 'react'
import PeopleList from 'containers/PeopleList'
import MessagesList from 'containers/MessagesList'
import authHoc from 'containers/authHoc'


class ChatWrap extends Component {
	render() {
		return (
			<div>
				<PeopleList/>
				<MessagesList/>
			</div>
		)
	}
}

export default authHoc(ChatWrap)