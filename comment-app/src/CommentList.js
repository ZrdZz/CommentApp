import React, {Component} from 'react';
import Comment from './Comment';

class CommentList extends Component{
	render(){
		return(
			<div>
				{this.props.comments.map((comment, index) => <Comment key={index} comment={comment} />)}
			</div>
		)
	}
}

CommentList.defaultProps = {
	comments: []
}

export default CommentList