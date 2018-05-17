import React from 'react'

class ChatOpenGraphLink extends React.Component {
  render() {
    let og = this.props.og

    return (
      <a href="#">
        <img className="ogImage" src={og.image}></img>
        <div className="ogTitle">
          <h5>{og.title}</h5>
          <p>
            {og.description}
          </p>
        </div>
      </a>
    )
  }
}

export default ChatOpenGraphLink
