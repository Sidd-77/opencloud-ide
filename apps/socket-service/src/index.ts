import { createServer } from 'http';
import { io } from './websocket';

const httpServer = createServer();

io.attach(httpServer); // Attach the socket.io instance to the HTTP server

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
