import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export interface Directory {
  type: 'dir';
  name: string;
  path: string;
  dirs: Directory[];
  files: File[];
}

export interface File {
  type: 'file';
  name: string;
  path: string;
}

export interface FileContentPayload {
  filePath: string;
  fileContent: string;
}

let socket: Socket;

export function useSocket() {
  const [directory, setDirectory] = useState<Directory | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  useEffect(() => {
    socket = io('http://localhost:3001');

    // Fetch the initial directory structure
    socket.emit('fetchDirectory');
    socket.on('directoryStructure', (data: Directory) => {
      setDirectory(data);
    });

    // Handle file content reception
    socket.on('fileContent', ({ filePath, fileContent }: FileContentPayload) => {
      setFileContent(fileContent);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchFile = (filePath: string) => {
    socket.emit('fetchFile', { filePath });
  };

  const updateFile = (filePath: string, content: string) => {
    socket.emit('updateFile', { filePath, content });
  };

  return {
    directory,
    fileContent,
    fetchFile,
    updateFile,
  };
}
