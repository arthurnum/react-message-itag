import React from 'react';

class ChatHeader extends React.Component {
  render() {
    return (
      <div className="chatHeader">
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}

export default ChatHeader;
