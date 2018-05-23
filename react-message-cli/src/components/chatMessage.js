import React from 'react'
import ChatOpenGraphLink from './chatOpenGraphLink'

class ChatMessage extends React.Component {
  render() {
    let msg = this.props.messageItem

    let ogs = msg.ogs && msg.ogs.map(og => {
      return (
        <ChatOpenGraphLink og={og} />
      )
    })

    return (
      <div className="messageWrapper">
        <div className="message">
          <span>{msg.user}</span>
          <p>{msg.message}</p>
          { ogs }
        </div>
      </div>
    );
  }
}

export default ChatMessage
