import React from 'react';

import ChatMessage from './chatMessage';

class ChatContent extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    let el = document.getElementById('chatContent');
    el.scrollTop = el.scrollHeight;
  }

  render() {
    const content = this.props.data.map((item) => {
      return (
        <ChatMessage key={item.id} messageItem={item} />
      )
    });

    return (
      <div id="chatContent" className="chatContent">
        {content}
      </div>
    );
  }
}

export default ChatContent;
