const contentData = []

export default function chatReducer(state, action) {
  switch (action.type) {
    case 'addMessage':
      state.data.push(action.data)
      return {
        data: state.data.slice()
      }
    case 'updateMessage':
      let index = state.data.findIndex(msg => (msg.id === action.data.id))
      state.data[index] = action.data
      return {
        data: state.data.slice()
      }
    default:
      return {
        data: contentData
      }
  }
};
