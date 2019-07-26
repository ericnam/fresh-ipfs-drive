import IPFSWrapper from '@Components/IPFSWrapper';
import '@Styles/App.scss';
import * as React from 'react';
import { render } from 'react-dom';
import IPFSNode from '@Utils/ipfsNode';

const ipfs = require('ipfs');
const ipfs_node = new ipfs();

const node = new IPFSNode(ipfs_node);

render(
  <IPFSWrapper ipfs={node}/>,
  document.getElementById('root')
)