import { asyncForEach } from '@Utils/helpers'
import { FOLDER_TYPE } from '@Utils/constants';
import { ToContextModel } from '@Context/contextConversion';


const ipfs_ls = async (ipfs, addr) => {
  return ipfs.ls(addr);
}

const findDir = (dir, entryPath, i) => {
  var pathArray = entryPath.split('/');
  if (pathArray.length - 1 === i) {
    return dir;
  }  
  return findDir(dir.children.find(x => x.name === pathArray[i]), entryPath, i+1);
}

const ipfsSwarmConnect = (ipfs, multiAddr, asyncCallback) => {
  ipfs.swarm.connect(multiAddr, async (err) => {
    console.log(err ? err : 'Successfully connected to rasp pi node.'); 
    await asyncCallback();
  });
}

const pullDirectory = async (ipfs, hash) => {
  var directory = new Array();
  await ipfs_ls(ipfs, hash).then(async (files) => {
    await asyncForEach(files, async (ipfsFile) => {
      var file = ToContextModel(ipfsFile);
      directory.push(file);  
      if (file.type === FOLDER_TYPE) {
        const subDir = await pullDirectory(ipfs, file.path);
        file.children = file.children.concat(subDir);
      };
    });
  });

  return directory;
}

export { ipfs_ls, findDir, pullDirectory, ipfsSwarmConnect };