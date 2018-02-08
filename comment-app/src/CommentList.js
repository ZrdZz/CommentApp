import React, {Component} from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

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

CommentList.propTypes = {
	comments: PropTypes.array
}

export default CommentList