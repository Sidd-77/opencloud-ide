import * as fs from 'fs';
import * as path from 'path';

enum Type {
  FILE,
  DIRECTORY,
  DUMMY
}

interface CommonProps {
  id: string;
  type: Type;
  name: string;
  parentId: string | undefined;
  depth: number;
}

interface File extends CommonProps {
  content: string;
}

interface Directory extends CommonProps {
  files: File[];
  dirs: Directory[];
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function buildDirectoryTree(dirPath: string, parentId: string | undefined = undefined, depth: number = 0): Directory {
  const stats = fs.statSync(dirPath);
  const name = path.basename(dirPath);
  
  const directory: Directory = {
    id: generateId(),
    type: Type.DIRECTORY,
    name,
    parentId,
    depth,
    files: [],
    dirs: []
  };

  const entries = fs.readdirSync(dirPath);

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    const entryStats = fs.statSync(fullPath);

    if (entryStats.isDirectory()) {
      const subDir = buildDirectoryTree(fullPath, directory.id, depth + 1);
      directory.dirs.push(subDir);
    } else if (entryStats.isFile()) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const file: File = {
        id: generateId(),
        type: Type.FILE,
        name: entry,
        parentId: directory.id,
        depth: depth + 1,
        content
      };
      directory.files.push(file);
    }
  }

  return directory;
}

function convertDirectoryToRootDir(directoryPath: string): Directory {
  if (!fs.existsSync(directoryPath)) {
   return {
    id: generateId(),
    type: Type.DIRECTORY,
    name: 'loading',
    parentId: 'loading',
    depth:0,
    files: [],
    dirs: []
  };
  }
  const rootDir = buildDirectoryTree(directoryPath);
  rootDir.parentId = undefined;
  rootDir.name = 'root';
  return rootDir;
}

// Usage example
// const directoryPath = '/home/sidd/app';
// const rootDir = convertDirectoryToRootDir(directoryPath);
// console.log(JSON.stringify(rootDir, null, 2));

// Helper functions as provided in the original code
function findFileByName(rootDir: Directory, filename: string): File | undefined {
  let targetFile: File | undefined = undefined;

  function findFile(dir: Directory, filename: string) {
    for (const file of dir.files) {
      if (file.name === filename) {
        targetFile = file;
        return;
      }
    }
    for (const subDir of dir.dirs) {
      findFile(subDir, filename);
    }
  }

  findFile(rootDir, filename);
  return targetFile;
}

function sortDir(l: Directory, r: Directory): number {
  return l.name.localeCompare(r.name);
}

function sortFile(l: File, r: File): number {
  return l.name.localeCompare(r.name);
}

// Export functions and types
export {
  Type,
  File,
  Directory,
  convertDirectoryToRootDir,
  findFileByName,
  sortDir,
  sortFile
};