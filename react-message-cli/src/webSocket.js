import io from 'socket.io-client';

// export const socket = io('ws://localhost:8080');
// export const socket = io('ws://react-message-itag.herokuapp.com');
export const socket = io();

export const emitNewMessage = data => socket.emit('newMessage', JSON.stringify(data))
