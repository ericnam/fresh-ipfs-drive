import { useState, useEffect } from "react";
import createUseContext from "constate"; 
import { FILE_TYPE, FOLDER_TYPE, HOME_NODE_ADDRS } from '@Utils/constants';
import { findDir, pullDirectory } from '@Utils/ipfsHelper';

const useDirectory = ({ initialDir }) => {
  const [dirInit, updateDirInit] = useState(false);
  const [dir, updateDir] = useState([]);
  
  useEffect(() => {
    if (!dirInit) {
      initialDir.forEach((ele) => {
        updateDir(dir => {dir.push(ele); return dir;});
        updateDirInit(true);
      });
    }
  });

  const AddFile = (newEntry) => {
    updateDir(prevDir => { 
      prevDir.push(newEntry);
      return prevDir;
    });
  };

  return { dir, AddFile };
}

const DirectoryContext = createUseContext(useDirectory);

export { DirectoryContext }