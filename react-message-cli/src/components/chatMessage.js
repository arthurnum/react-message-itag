import React from 'react';

class ChatMessage extends React.Component {
  render() {
    let ogs = this.props.ogs && this.props.ogs.map(og => {
      return (
        <a href="#">
          <img className="ogImage" src={og.image}></img>
          <p className="ogTitle">
            <h5>{og.title}</h5>
            {og.description}
          </p>
        </a>
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

export default ChatMessage;
