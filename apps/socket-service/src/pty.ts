import * as pty from 'node-pty';
import os from 'os';

export function handleShellSession(socket: any) {
  const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: '/home/sidd/app',
    env: process.env
  });

  ptyProcess.onData((data: string) => {
    socket.emit('output', data);
  });

  socket.on('input', (data: string) => {
    ptyProcess.write(data);
  });

  socket.on('resize', (size: { cols: number, rows: number }) => {
    ptyProcess.resize(size.cols, size.rows);
  });

  socket.on('create', (data: any) => {
    console.log('Create event received with data: ', data);
  });

  return { ptyProcess };
}
