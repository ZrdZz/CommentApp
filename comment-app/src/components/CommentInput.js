import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CommentInput extends Component{
	constructor(props){
		super(props);
		this.state = {
			username: props.username,
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
    
    //将评论信息传递给containers组件
	handleSubmit(){
		var {username, content} = this.state;
		if(this.props.onSubmit){
			this.props.onSubmit({username, content, createdTime: +new Date()});
		}
		this.setState({content: ''});
	}
    
    //用户名输入框失去焦点时,将值传入containers组件中
	handleUsernameBlur(e){
		if(this.props.onUsernameBlur){
			this.props.onUsernameBlur(e.target.value);
		}
	}

	componentDidMount(){
		this.textarea.focus();
	}

	render(){
		return(
			<div className='comment-input'>
				<div className='comment-field'>
					<span className='comment-field-name'>用户名:</span>
					<div className='comment-field-input'>
						<input name='username' value={this.state.username} onChange={this.handleInputChange.bind(this)} onBlur={this.handleUsernameBlur.bind(this)}/>
					</div>
				</div>
				<div className='comment-field'>
					<span className='comment-field-name'>评论内容:</span>
					<div className='comment-field-input'>
						<textarea name='content' value={this.state.content} onChange={this.handleInputChange.bind(this)} ref={(textarea)=>{this.textarea=textarea}}/>
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

CommentInput.propTypes = {
	onSubmit: PropTypes.func,
	onUsernameBlur: PropTypes.func,
	username: PropTypes.string
}

export default CommentInput