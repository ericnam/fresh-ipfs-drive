import { useState } from "react";
import createUseContext from "constate"; 
import { FILE_TYPE, FOLDER_TYPE, HOME_NODE_ADDRS } from '@Utils/constants';
import { findDir, pullDirectory } from '@Utils/ipfs';

const ipfs = require('ipfs');
const ipfs_node = new ipfs();

const testHash = "QmRWZeYxzfTm9LwUCQcj3QVLMZgzRFVqjiYp8aeyconrmh";

const useDirectory = () => {

  // app states
  const [HomeNodeInit, updateHomeNodeInit] = useState(false);
  const [IPFSinit, updateIPFSInit] = useState(false);
  const [dir, updateDir] = useState(new Array());

  ipfs_node.on('ready', () => {    
    updateIPFSInit(true);

    // Connect to raspi node
    ipfs_node.swarm.connect(HOME_NODE_ADDRS, async (err) => {
      updateHomeNodeInit(true);
      console.log(err ? err : 'Successfully connected to rasp pi node.'); 
      const rootDir = await pullDirectory(ipfs_node, testHash);

      rootDir.forEach((ele) => {
        updateDir(prevDir => {
          prevDir.push(ele);
          return prevDir;          
        });
      });
    });
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