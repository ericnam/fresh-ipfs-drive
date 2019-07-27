import IPFSWrapper from '@Components/IPFSWrapper';
import '@Styles/App.scss';
import * as React from 'react';
import { render } from 'react-dom';
import IPFSNode from '@Utils/ipfsNode';

const ipfs = require('ipfs');
const node = new IPFSNode(new ipfs());

render(
  <IPFSWrapper ipfs={node}/>,
  document.getElementById('root')
)