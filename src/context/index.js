import { useState } from "react";
import createUseContext from "constate"; 
import { FILE_TYPE, FOLDER_TYPE, HOME_NODE_ADDRS } from '@Utils/constants';
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

const searchDir = (dir, entryPath, i) => {
  var pathArray = entryPath.split('/');
  if (pathArray.length - 1 === i) {
    return dir;
  }  
  return searchDir(dir.children.find(x => x.name === pathArray[i]), entryPath, i+1);
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const pullDirectory = async (ipfs, hash) => {
  var directory = [];

  ipfs.ls(hash, async (err, files) => {
    if (err) { console.log(err); }

    asyncForEach(files, async (file) => {
      directory.push(file);
      if (file.type === 'dir') {
        const subDir = await pullDirectory(ipfs, file.path);
        directory.concat(subDir);
      }
    })

    // files.forEach((file) => {
    //   if (err) { console.log(err); }
    //   directory.push(file);
    //   if (file.type === 'dir') {
    //     const subDir = await pullDirectory(ipfs, file.path);
    //     directory.concat(subDir);
    //   }
    // });

    // console.log(directory)
    return directory;
  });
}

const useDirectory = () => {

  // app states
  const [HomeNodeInit, updateHomeNodeInit] = useState(false);
  const [IPFSinit, updateIPFSInit] = useState(false);
  const [dir, updateDir] = useState([]);

  ipfs_node.on('ready', () => {    
    // Connect to raspi node
    ipfs_node.swarm.connect(HOME_NODE_ADDRS, async (err) => {
      if (err) { 
        console.log(err); 
      }
      else { 
        console.log('Successfully connected to rasp pi node.'); 
      }

      const rootDir = await pullDirectory(ipfs_node, testHash);
      console.log(rootDir);
    });


    // ipfs_node.ls(testHash, (err, files) => {
    //   console.log('ls hit');
    //   if (err) { console.log(err); }
    //   files.forEach((file) => {
    //     console.log(file.path + " " + file.type)
    //   })
    // });
  });

  const AddFile = (newEntry) => {
    updateDir(prevDirStr => { 
      var prevDir = JSON.parse(prevDirStr);
      searchDir(prevDir, newEntry.path, 1).children.push(newEntry);
      return JSON.stringify(prevDir);
    });
  };

  return { dir, AddFile };
}

const DirectoryContext = createUseContext(useDirectory);

export { DirectoryContext }