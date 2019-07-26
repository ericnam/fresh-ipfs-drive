import { ipfsSwarmConnect, pullDirectory } from '@Utils/ipfsHelper';

class IPFSNode {
  nodeInit: Boolean;
  node: any;
  constructor(ipfs: any) {
    this.node = ipfs;
    ipfs.on('ready', () => {
      this.nodeInit = true;
    });
  }

  connectToNode (nodeMultiAddr: string, asyncCallback: any) {
    ipfsSwarmConnect(this.node, nodeMultiAddr, asyncCallback);
  }
}

export default IPFSNode;