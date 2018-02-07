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
		var comments = [comment];
		this.setState({
			comments: [...this.state.comments, ...comments]
		})
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