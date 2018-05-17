import React from 'react'
import ChatOpenGraphLink from './chatOpenGraphLink'

class ChatMessage extends React.Component {
  render() {
    let ogs = this.props.ogs && this.props.ogs.map(og => {
      return (
        <ChatOpenGraphLink og={og} />
      )
    })

    return (
      <div className="messageWrapper">
        <span>{this.props.user}</span>
        <p>{this.props.message}</p>
        { ogs }
      </div>
    );
  }
}

export default ChatMessage
