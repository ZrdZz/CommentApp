import React from 'react';
import ReactDOM from 'react-dom';
import CommentApp from './containers/CommentApp';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import commentReducer from './reducers/comments';
import './index.css';

const store = createStore(commentReducer);

ReactDOM.render(
	<Provider store={store}>
		<CommentApp />
	</Provider>,
	document.getElementById('root')
)