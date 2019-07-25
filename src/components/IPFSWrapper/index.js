import React, { useState, useEffect } from 'react';
import { DirectoryContext }  from '@Context';
import SideNav from '@Components/SideNav';
import { HOME_NODE_ADDRS } from '@Utils/constants';
import { pullDirectory, ipfsSwarmConnect } from '@Utils/ipfs';

const testHash = "QmRWZeYxzfTm9LwUCQcj3QVLMZgzRFVqjiYp8aeyconrmh";

const IPFSWrapper = (props) => {
  const [ipfs_init, updateIpfsInit] = useState(false);
  const [dirInit, updateDirInit] = useState(false);
  const [dir, updateDir] = useState([]);
  
  useEffect(() => {
    if (!ipfs_init) {
      props.ipfs.on('ready', () => {
        updateIpfsInit(true);
      });
    }
    else
    {
      if (!dirInit) {          
        ipfsSwarmConnect(props.ipfs, HOME_NODE_ADDRS, async () => {
          const rootDir = await pullDirectory(props.ipfs, testHash);
          rootDir.forEach((ele) => {
            updateDir((dir) => { dir.push(ele); return dir; });
          });
          updateDirInit(() => { return true; });
        });
      }
    }
  });

  if (dirInit) {
    return (
      <DirectoryContext.Provider initialDir={dir}>
        <SideNav />
      </DirectoryContext.Provider>
    )
  }
  else
  {
    return (
      <div>Loading</div>
    )
  }
}

export default IPFSWrapper;