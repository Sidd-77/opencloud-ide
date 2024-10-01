import React from 'react';
import { io } from 'socket.io-client';

// Connect to WebSocket server
const socket = io("http://localhost:3001");

export const useFilesFromServer = (replid : string, callback) => {
  React.useEffect(() => {
    // Listen for the files list from the server
    socket.on('files-list', (fileTree) => {
      callback(fileTree);
    });

    // Request the files from the server
    socket.emit('fetch-files', replid);

    // Clean up the listener when component unmounts
    return () => {
      socket.off('files-list');
    };
  }, [replid, callback]);
};
