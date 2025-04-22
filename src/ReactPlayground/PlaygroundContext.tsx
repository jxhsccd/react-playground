import React, { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { initFiles } from './files';
import { fileName2Language, compress, uncompress } from './utils';
import { Theme as MonacoTheme } from '@monaco-editor/react';


export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}


export type Theme = 'light' | 'dark';

export interface PlaygroundContext {
  files: Files;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  setFiles: (files: Files) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
}
export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: 'App.tsx',
} as PlaygroundContext);

/**
 * 从URL哈希中解析文件数据
 * @returns 解析后的文件对象或undefined
 */
const getFilesFromUrl = (): Files | undefined => {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return undefined;
    
    const uncompressed = uncompress(hash);
    const parsedFiles = JSON.parse(uncompressed);
    
    if (parsedFiles && typeof parsedFiles === 'object') {
      return parsedFiles;
    }
  } catch (error) {
    console.error('Failed to parse files from URL:', error);
  }
  return undefined;
};

export const PlaygroundProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(getFilesFromUrl() || initFiles);
  const [selectedFileName, setSelectedFileName] = useState('App.tsx');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    try {
      const compressed = compress(JSON.stringify(files));
      window.location.hash = compressed;
    } catch (error) {
      console.error('Failed to update URL hash:', error);
    }
  }, [files]);


  const addFile = (name: string) => {
    if (!name || files[name]) return; // 防止重复添加
    
    setFiles(prevFiles => ({
      ...prevFiles,
      [name]: {
        name,
        language: fileName2Language(name),
        value: '',
      }
    }));
  };

  const removeFile = (name: string) => {
    if (!files[name]) return;
    
    const newFiles = { ...files };
    delete newFiles[name];
    setFiles(newFiles);
    
    if (name === selectedFileName && Object.keys(newFiles).length > 0) {
      setSelectedFileName(Object.keys(newFiles)[0]);
    }
  };

  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (!files[oldFieldName] || !newFieldName || files[newFieldName]) return;
    
    const { [oldFieldName]: oldFile, ...restFiles } = files;
    
    setFiles({
      ...restFiles,
      [newFieldName]: {
        ...oldFile,
        name: newFieldName,
        language: fileName2Language(newFieldName),
      }
    });
    
    if (oldFieldName === selectedFileName) {
      setSelectedFileName(newFieldName);
    }
  };

  return (
    <PlaygroundContext.Provider
      value={{
        theme,
        setTheme,
        files,
        selectedFileName,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};