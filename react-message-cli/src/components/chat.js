import React from 'react';
import { connect } from 'react-redux';

import ChatHeader from './chatHeader';
import ChatContent from './chatContent';
import ChatInput from './chatInput';
import { emitNewMessage } from '../webSocket';
// import { newMessage } from '../actions/chatActions';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.chatInputCallback = this.chatInputCallback.bind(this);
  }

  componentDidMount() {

  }

  chatInputCallback(message) {
    let data = {
      user: 'Me',
      message
    };
    emitNewMessage(data);
  }

  render() {
    return (
      <div className="chatWrapper">

        <ChatHeader title="Room#1" />

        <div className="spaceBlock"></div>

        <ChatContent data={this.props.data} />

        <div className="spaceBlock"></div>

        <ChatInput chatInputCallback={this.chatInputCallback} />

      </div>
    );
  }
}

export default connect( ({data}) => ({data}) )(Chat);
