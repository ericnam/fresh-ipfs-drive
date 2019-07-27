import * as React from 'react'; 
import { useState, useEffect, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { addFile, getDirectory } from '@Action'
import { DirectoryContext }  from '@Context/index';
import IPFSObject from '@Model/IPFSObject';

import Directory from './Directory';
import { SideNavContainer, CreateButton } from './styles';
import { FILE_TYPE, FOLDER_TYPE } from '@Utils/constants'

const SideNav = () => {
  const [reloadComponent, initReload] = useState(false);
  const { AddFile } = DirectoryContext();

  const newEntry: IPFSObject = {
    name: 'wow',
    hash: 'string',
    path: 'string',
    type: 'string',
    size: 1,
    children: new Array<IPFSObject>(),
    syned: true,
    syncing: true
  }

  return (
    <SideNavContainer>
      <CreateButton onClick={() => {AddFile(newEntry); initReload(!reloadComponent)}}>Create</CreateButton>
      <Directory />
    </SideNavContainer>
  )
}

export default SideNav;