export enum Type {
    FILE = 'FILE', // File type
    DIRECTORY = 'DIRECTORY', // Directory type
    DUMMY = 'DUMMY', // Dummy type for un-fetched files
  }
  
  interface CommonProps {
    id: string;
    type: Type;
    name: string;
    parentId: string | undefined;
    depth: number;
  }
  
  export interface File extends CommonProps {
    content: string;
  }
  
  export interface Directory extends CommonProps {
    files: File[];
    dirs: Directory[];
  }
  