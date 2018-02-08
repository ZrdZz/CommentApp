import React, {Component} from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

class CommentApp extends Component{
	constructor(props){
		super(props);
		this.state = {
			comments: []
		}
	}

	_saveComments(comments){
		localStorage.setItem('comments',JSON.stringify(comments));
	}

	_loadComments(){
		var comments = localStorage.getItem('comments');
		comments = JSON.parse(comments);
		if(comments){
			this.setState({comments})
		}
	}

	handleSubmitComment(comment){
		if(!comment){
			return
		}
		if(!comment.username){
			return alert('请输入用户名!')
		}
		if(!comment.content){
			return alert('请输入评论内容!')
		}
		var comments = this.state.comments;
		comments.push(comment);
		this.setState({comments});

		//将评论保存在localStorage
		this._saveComments(comments);
	}

	componentWillMount(){
		this._loadComments();
	}

	render(){
		return(
			<div className='wrapper'>
				<CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
				<CommentList comments={this.state.comments}/>
			</div>
		)
	}
}

export default CommentApp;