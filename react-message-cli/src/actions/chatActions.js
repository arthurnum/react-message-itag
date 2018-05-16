import * as api from '../api'

const newMessage = data => {
  return { type: 'addMessage', data }
}

const getItems = () => (dispatch, getState) =>
  // api.get('/items?page=' + getState().page)
  api.get('/messages')
  .then(res => {
    let action = {
      type: 'loadMessages',
      data: res
    };
    return dispatch(action)
  })

export { newMessage }
