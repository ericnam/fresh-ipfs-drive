import { useState } from "react";
import createUseContext from "constate"; 
import { FILE_TYPE, FOLDER_TYPE, HOME_NODE_ADDRS } from '@Utils/constants';
import { findDir, pullDirectory } from '@Utils/ipfs';
import multiaddr from 'multiaddr';

const ipfs = require('ipfs');
const ipfs_node = new ipfs();

const root = {
  type: FOLDER_TYPE,
  name: 'root',
  path: '/',
  size: 0,
  date: '',
  synced: false,
  syncing: false, 
  children: [
    {
      type: FOLDER_TYPE,
      name: 'wow',
      path: '/wow',
      size: 0,
      date: '',
      synced: false,
      syncing: false, 
      children: []
    }
  ]
}

const testHash = "QmRWZeYxzfTm9LwUCQcj3QVLMZgzRFVqjiYp8aeyconrmh";

const useDirectory = () => {

  // app states
  const [HomeNodeInit, updateHomeNodeInit] = useState(false);
  const [IPFSinit, updateIPFSInit] = useState(false);
  const [dir, updateDir] = useState([]);

  ipfs_node.on('ready', () => {    
    // Connect to raspi node
    ipfs_node.swarm.connect(HOME_NODE_ADDRS, async (err) => {
      console.log(err ? err : 'Successfully connected to rasp pi node.'); 
      const rootDir = await pullDirectory(ipfs_node, testHash);
      console.log(rootDir);
    });
  });

  const AddFile = (newEntry) => {
    updateDir(prevDirStr => { 
      var prevDir = JSON.parse(prevDirStr);
      findDir(prevDir, newEntry.path, 1).children.push(newEntry);
      return JSON.stringify(prevDir);
    });
  };

  return { dir, AddFile };
}

const DirectoryContext = createUseContext(useDirectory);

export { DirectoryContext }