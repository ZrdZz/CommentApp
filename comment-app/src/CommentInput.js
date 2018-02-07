import React, {Component} from 'react';

class CommentInput extends Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			content: ''
		}
	}

	handleInputChange(e){
		var target = e.target;
		var name = target.name;
		this.setState({
			[name]: e.target.value
		})
	}

	handleSubmit(){
		var {username, content} = this.state;
		if(this.props.onSubmit){
			this.props.onSubmit({username, content});
		}
		this.setState({content: ''});
	}

	render(){
		return(
			<div className='comment-input'>
				<div className='comment-field'>
					<span className='comment-field-name'>用户名:</span>
					<div className='comment-field-input'>
						<input name='username' value={this.state.username} onChange={this.handleInputChange.bind(this)}/>
					</div>
				</div>
				<div className='comment-field'>
					<span className='comment-field-name'>评论内容:</span>
					<div className='comment-field-input'>
						<textarea name='content' value={this.state.content} onChange={this.handleInputChange.bind(this)}/>
					</div>
				</div>
				<div className='comment-field-button'>
					<button onClick={this.handleSubmit.bind(this)}>
						发布
					</button>
				</div>
			</div>
		)
	}
}

export default CommentInput