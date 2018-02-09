import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Comment extends Component{
	constructor(props){
		super(props);
		this.state = {
			timeString: ''
		}
	}

	_updateTimeString(){
		const publicedTime = this.props.comment.createdTime,
			  time = (+new Date() - publicedTime) / 1000;

		this.setState({
			timeString: time >= 60 ? `${Math.round(time / 60)}分钟前` : `${Math.round(Math.max(time, 1))}秒前`
		})
	}

	_getProcessedContent(content){
		return content
      				.replace(/&/g, "&amp;")
      				.replace(/</g, "&lt;")
     				.replace(/>/g, "&gt;")
      				.replace(/"/g, "&quot;")
      				.replace(/'/g, "&#039;")
      				.replace(/`([\S\s]+?)`/g, '<code>$1</code>')
	}

	handleDeleteComment(){
		this.props.onDeleteComment(this.props.index);
	}

	componentWillMount(){
		this._updateTimeString();
		this._timer = setInterval(this._updateTimeString.bind(this), 5000);
	}

	componentWillUnmount(){
		clearInterval(this._timer);
	}

	render(){
		return(
			<div className='comment'>
				<div className='comment-user'>
					<span>{this.props.comment.username}</span> :
				</div>
				<p dangerouslySetInnerHTML={{__html: this._getProcessedContent(this.props.comment.content)}}/>
				<span className='comment-createdtime'>
					{this.state.timeString}
				</span>
				<span className='comment-delete' onClick={this.handleDeleteComment.bind(this)}>
					删除
				</span>
			</div>
		)
	}
}

Comment.propTypes = {
	comment: PropTypes.object,
	index: PropTypes.number,
	onDeleteComment: PropTypes.func
}

export default Comment