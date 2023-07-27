import React, {Component} from 'react'
import {connect} from 'react-redux'
import ChatHeader from 'components/ChatHeader'
import MessageItem from 'components/MessageItem'
import ChatControl from 'components/ChatControl'


class MessagesList extends Component {

	constructor() {
		super()

		this.ul = null
		this.chatWrap = null
	}

	componentDidUpdate() {
		this.chatWrap.scrollTop = this.ul.scrollHeight
	}

	render() {
		return (
			<div class="chat">
				<ChatHeader/>

				<div class="chat-history" ref={ chatWrap => this.chatWrap = chatWrap }>
					<ul ref={ ul => this.ul = ul }>
						{this.props.message.map(m => {
							return (
							<MessageItem key={m.time} {...m} />
							)
						})}
					</ul>
				</div>
				<ChatControl />
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {message: state.messagesReducer}
}
const mapDispatchToProps = (dispatch) => {
	return (
		{dispatch}
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList)