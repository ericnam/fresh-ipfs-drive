import { useState, useEffect } from "react";
import createUseContext from "constate"; 

const useDirectory = (props: any) => {
  const initialDir: Object[] = props.initialDir;
  const [dirInit, updateDirInit] = useState(false);
  const [dir, updateDir] = useState([]);
  
  useEffect(() => {
    if (!dirInit) {
      console.log(initialDir);
      initialDir.forEach((ele: Object) => {
        updateDir(dir => {dir.push(ele); return dir;});
        updateDirInit(true);
      });
    }
  });

  const AddFile = (newEntry: Object) => {
    updateDir(prevDir => { 
      prevDir.push(newEntry);
      return prevDir;
    });
  };

  return { dir, AddFile };
};

const DirectoryContext = createUseContext(useDirectory);

export { DirectoryContext }