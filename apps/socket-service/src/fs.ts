import fs from 'fs';
import path from 'path';

export interface RemoteFile {
  type: 'file' | 'dir';
  name: string;
  path: string;
}

const BASE_DIRECTORY = '/home/sidd/app'; // Set your project directory

// Function to read directory structure recursively
export function readDirectoryStructure(dirPath: string): { files: RemoteFile[], dirs: RemoteFile[] } {
  const files: RemoteFile[] = [];
  const dirs: RemoteFile[] = [];

  const items = fs.readdirSync(dirPath);
  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      dirs.push({
        type: 'dir',
        name: item,
        path: fullPath.replace(BASE_DIRECTORY, ''), // Get relative path
      });
    } else {
      files.push({
        type: 'file',
        name: item,
        path: fullPath.replace(BASE_DIRECTORY, ''),
      });
    }
  });

  return { files, dirs };
}

// Function to read the content of a file
export function readFile(filePath: string): string {
  return fs.readFileSync(path.join(BASE_DIRECTORY, filePath), 'utf8');
}

// Function to write updated content to a file
export function writeFile(filePath: string, content: string): void {
  fs.writeFileSync(path.join(BASE_DIRECTORY, filePath), content, 'utf8');
}
