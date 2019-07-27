import { useState, useEffect } from "react";
import createUseContext from "constate"; 
import IPFSObject from '@Model/IPFSObject';

const useDirectory = (props: any) => {
  const initialDir: IPFSObject[] = props.initialDir;
  const [dirInit, updateDirInit] = useState(false);
  const [dir, updateDir] = useState([]);
  
  useEffect(() => {
    if (!dirInit) {
      initialDir.forEach((ele: IPFSObject) => {
        updateDir(dir => {dir.push(ele); return dir;});
        updateDirInit(true);
      });
    }
  });

  const AddFile = (newEntry: IPFSObject) => {
    updateDir(prevDir => { 
      prevDir.push(newEntry);
      return prevDir;
    });
  };

  return { dir, AddFile };
};

const DirectoryContext = createUseContext(useDirectory);

export { DirectoryContext }