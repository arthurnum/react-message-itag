import io from 'socket.io-client';

export const socket = io('ws://localhost:8080');

export const emitNewMessage = data => socket.emit('newMessage', JSON.stringify(data))
