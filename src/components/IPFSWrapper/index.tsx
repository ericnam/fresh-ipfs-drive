import SideNav from '@Components/SideNav';
import { DirectoryContext } from '@Context/index';
import { HOME_NODE_ADDRS } from '@Utils/constants';
import { ipfsSwarmConnect, pullDirectory } from '@Utils/ipfsHelper';
import * as React from 'react';
import { useEffect, useState } from 'react';

const testHash = "QmRWZeYxzfTm9LwUCQcj3QVLMZgzRFVqjiYp8aeyconrmh";

const IPFSWrapper = (props: any) => {
  const [ipfs_init, updateIpfsInit] = useState(props.ipfs.nodeInit);
  const [dirInit, updateDirInit] = useState(false);
  const [dir, updateDir] = useState([]);
  
  useEffect(() => {
    if (!ipfs_init) {
      props.ipfs.node.on('ready', () => {
        updateIpfsInit(true);
      });
    }
    else
    {
      if (!dirInit) {
        props.ipfs.connectToNode(HOME_NODE_ADDRS, async () => {
          const rootDir = await pullDirectory(props.ipfs.node, testHash);
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