import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CommentList from '../components/CommentList';
import {initComments, deleteComment} from '../reducers/comments';

class CommentListContainer extends Component{
	_loadComments(){
		var comments = localStorage.getItem('comments');
		comments = comments ? JSON.parse(comments) : [];
		this.props.initComments(comments);
	}

	handleDeleteComment(index){
		const {comments} = this.props;
		const newComments = [
			...comments.slice(0, index),
			...comments.slice(index + 1)
		]
		localStorage.setItem('comments', JSON.stringify(newComments));
		if(this.props.onDeleteComment){
			this.props.onDeleteComment(index);
		}
	}

	conponentWillMount(){
		this._loadComments();
	}

	render(){
		return(
			<CommentList comments={this.props.comments} onDeleteComment={this.handleDeleteComment.bind(this)}/>
		)
	}
}

CommentListContainer.propTypes = {
	comments: PropTypes.array,
	initComments: PropTypes.func,
	onDeleteComment: PropTypes.func
}

const mapStateToProps = (state) => {
	return {
		comments: state.comments
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		initComments: (comments) => {
			dispatch(initComments(comments))
		},
		onDeleteComment: (index) => {
			dispatch(deleteComment(index))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)