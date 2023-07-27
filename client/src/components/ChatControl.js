import React, {Component} from 'react'
import ws from 'util/ws'


export default class ChatControl extends Component {

	constructor() {
		super()

		this.textarea = null
	}

	addNewMessageWithEnter(e) {
		const msg = this.textarea.value
		const code = (e.keyCode ? e.keyCode : e.which);
		if (code === 13 && msg.trim().length) {
			e.preventDefault()
			ws.emit(msg)
			this.textarea.value = ''
		}
		return false
	}

	addNewMessage() {
		const msg = this.textarea.value
		if (msg.trim().length) {
			ws.emit(msg)
			this.textarea.value = ''
		}
		return false
	}

	render() {
		return (
			<div class="chat-message clearfix">
				<textarea onKeyPress={this.addNewMessageWithEnter.bind(this)}  ref={ textarea => this.textarea = textarea } placeholder="Type your message" rows="4"></textarea>
				<button onClick={this.addNewMessage.bind(this)}>Send</button>
			</div>
		)
	}
}