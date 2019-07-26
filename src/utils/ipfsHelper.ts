import { asyncForEach } from '@Utils/helpers'
import { FOLDER_TYPE } from '@Utils/constants';
import { ToContextModel } from '@Context/contextConversion';

const ipfsList = async (ipfs: any, addr: string) => {
  return ipfs.ls(addr);
}

// const findDir = (dir: any, entryPath: string, i: number) => {
//   var pathArray = entryPath.split('/');
//   if (pathArray.length - 1 === i) {
//     return dir;
//   }  
//   return findDir(dir.children.find(x => x.name === pathArray[i]), entryPath, i+1);
// }

const ipfsSwarmConnect = (ipfs: any, multiAddr: string, asyncCallback: any) => {
  ipfs.swarm.connect(multiAddr, async (err: any) => {
    console.log(err ? err : 'Successfully connected to rasp pi node.'); 
    await asyncCallback();
  });
}

const pullDirectory = async (ipfs: any, hash: string) => {
  var directory = new Array();
  await ipfsList(ipfs, hash).then(async (files) => {
    await asyncForEach(files, async (ipfsFile: any) => {
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

export { ipfsList, pullDirectory, ipfsSwarmConnect };