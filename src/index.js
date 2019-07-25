import * as React from 'react';
import { render } from 'react-dom';
import IPFSWrapper from '@Components/IPFSWrapper';
import '@Styles/App.scss';

const ipfs = require('ipfs');
const ipfs_node = new ipfs();

render(
  <IPFSWrapper ipfs={ipfs_node}/>,
  document.getElementById('root')
)