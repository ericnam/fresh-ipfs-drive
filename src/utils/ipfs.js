import { asyncForEach } from '@Utils/helpers'

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

const pullDirectory = async (ipfs, hash) => {
  var directory = new Array();
  await ipfs_ls(ipfs, hash).then(async (files) => {
    await asyncForEach(files, async (file) => {
        directory.push(file);  
        if (file.type === 'dir') {
          const subDir = await pullDirectory(ipfs, file.path);
          directory = directory.concat(subDir);
        };
    });
  });

  return directory;
}

export { ipfs_ls, findDir, pullDirectory };