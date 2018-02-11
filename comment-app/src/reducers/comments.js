const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const initComments = function(comments){
	return {
		type: INIT_COMMENTS,
		comments
	}
}

export const addComment = function(comment){
	return {
		type: ADD_COMMENT,
		comment
	}
}

export const deleteComment = function(index){
	return {
		type: DELETE_COMMENT,
		index
	}
}

export default function(state, action){
	if(!state){
		state = {comments: []}
	}
	switch(action.type){
		case INIT_COMMENTS:
			return {
				comments: action.comments
			}
		case ADD_COMMENT:
			return {
				comments: [...state.comments, action.comment]
			}
		case DELETE_COMMENT:
		    return {
		    	comments: [
		    		...state.comments.slice(0, action.index),
		    		...state.comments.slice(action.index + 1)
		    	]
		    }
		default: 
			return state
	}
}