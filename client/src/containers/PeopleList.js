import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserItem from 'components/UserItem'


class PeopleList extends Component {
	render() {
		return (
		<div class="people-list" id="people-list">
			<ul class="list">
				{this.props.people.map(u => {
					return (
					<UserItem key={u.id} userName={u.userName} avatar={u.avatar}/>
					)
				})}
			</ul>
		</div>)
	}
}


const mapStateToProps = (state) => {
	return {people: state.peopleReducer}
}
const mapDispatchToProps = (dispatch) => {
	return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList)