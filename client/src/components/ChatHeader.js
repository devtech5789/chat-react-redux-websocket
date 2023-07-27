import React, { Component } from 'react'


export default class ChatHeader extends Component {
	render() {
		return (
			<div class="chat-header clearfix">
				<div class="chat-about">
					<div class="chat-with">MainHall</div>
				</div>
				<i class="fa fa-star" />
			</div>
		)
	}
}