import io from 'socket.io-client';

export const socket = io();

export const emitNewMessage = data => socket.emit('newMessage', JSON.stringify(data))
