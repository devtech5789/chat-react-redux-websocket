import React, { Component } from 'react'

export default class UserItem extends Component {
	render() {
		return (
			<li class="clearfix">
				<img src={this.props.avatar} alt="avatar"/>
				<div class="about">
					<div class="name">{this.props.userName}</div>
					<div class="status">
						<i class="fa fa-circle online"></i> online
					</div>
				</div>
			</li>
		)
	}
}