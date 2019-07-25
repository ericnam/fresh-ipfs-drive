import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addFile, getDirectory } from '@Action'
import { DirectoryContext }  from '@Context';

import { SideNavContainer, CreateButton } from './styles';
import { FILE_TYPE, FOLDER_TYPE } from '@Utils/constants'

const SideNav = () => {
  const { dir, AddFile } = DirectoryContext();

  console.log('side nav');
  console.log(dir);

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
      <CreateButton onClick={() => AddFile(newEntry)}>Create</CreateButton>
    </SideNavContainer>
  )
}

// const mapStateToProps = state => {
//   return {
//     ipfs: state.ipfs,
//     init: state.init
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     { 
//       addFile,
//       getDirectory
//     }
//     , dispatch);
// }

export default SideNav;
// export default connect(mapStateToProps, mapDispatchToProps)(SideNav);