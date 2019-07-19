import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addFile, getDirectory } from '@Action'
import { IPFSContext }  from '@Context';

import { SideNavContainer } from './styles';

const SideNav = () => {
  const { dir } = IPFSContext();
  return(
    <SideNavContainer>{dir}</SideNavContainer>
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