import React, { Component } from 'react';
import css from 'dom-css';

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.onChatInputType = this.onChatInputType.bind(this);
    this.onChatScroll = this.onChatScroll.bind(this);
  }

  onChatInputType(ev) {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault();

      let msg = ev.target.value;
      if (msg && msg.trimRight().length > 0) { this.props.chatInputCallback(msg) }

      ev.target.value = '';
    }
  }

  onChatScroll(ev) {
    let scroll = document.getElementById('scroll');
    let trackPad = document.getElementById('trackPad');
    let top = 0;
    if (ev.target.scrollTop > 0) {
      top = ev.target.scrollTop / (ev.target.scrollHeight - ev.target.clientHeight) * (scroll.clientHeight - trackPad.clientHeight - 6);
    }
    css(trackPad, { transform: `translateY(${top}px)` });
  }

  render() {
    return (
      <div className="chatInput">
        <textarea id="userInput" onKeyDown={this.onChatInputType} onScroll={this.onChatScroll}></textarea>
        <div id="scroll" className="scrollWrapper">
          <div id="trackPad"></div>
        </div>
      </div>
    );
  }
}

export default ChatInput;
