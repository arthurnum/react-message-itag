import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reset from 'reset-css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Chat from './components/chat';
import chatStore from './stores/chatStore';
import { socket } from './webSocket';
import { newMessage } from './actions/chatActions';

ReactDOM.render(
  <Provider store={chatStore}>
    <Chat />
  </Provider>,
  document.getElementById('chatPlaceholder')
);

registerServiceWorker();

socket.on('newMessage', data => {
  chatStore.dispatch(newMessage(JSON.parse(data)));
})
