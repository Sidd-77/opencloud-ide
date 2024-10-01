import { Server } from 'socket.io';
import { handleShellSession } from './pty';
import { fetchS3Folder, uploadS3Folder } from './s3';

const io = new Server({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  const replid: string = 'test';
  console.log(`Client with REPL ID ${replid} connected`);

  // Fetch the S3 folder
  fetchS3Folder(replid);

  // Handle the terminal session
  const { ptyProcess } = handleShellSession(socket);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // Upload updated files on disconnect back to S3
    uploadS3Folder(replid);
    ptyProcess.kill();
  });
});

export { io };
