import React, { useState, useEffect, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addFile, getDirectory } from '@Action'
import { DirectoryContext }  from '@Context';

import Directory from './Directory';
import { SideNavContainer, CreateButton } from './styles';
import { FILE_TYPE, FOLDER_TYPE } from '@Utils/constants'

const SideNav = () => {
  const [reloadComponent, initReload] = useState(false);
  const { dir, AddFile } = DirectoryContext();

  const newEntry = {
    type: FILE_TYPE,
    name: 'test',
    path: '/wow/amaze',
    size: 0,
    depth: 0,
    synced: false,
    syncing: false, 
    children: []
  }

  return(
    <SideNavContainer>
      <CreateButton onClick={() => {AddFile(newEntry); initReload(reloadComponent*-1)}}>Create</CreateButton>
      <Directory />
    </SideNavContainer>
  )
}

export default SideNav;