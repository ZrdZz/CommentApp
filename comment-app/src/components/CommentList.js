import React, {Component} from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class CommentList extends Component{
	handleDeleteComment(index){
		this.props.onDeleteComment(index);
	}

	render(){
		return(
			<div>
				{this.props.comments.map((comment, index) => <Comment key={index} 
																	  comment={comment} 
																	  index={index} 
																	  onDeleteComment={this.handleDeleteComment.bind(this)}/>)
			    }
			</div>
		)
	}
}

CommentList.defaultProps = {
	comments: []
}

CommentList.propTypes = {
	comments: PropTypes.array,
	onDeleteComment: PropTypes.func
}

export default CommentList