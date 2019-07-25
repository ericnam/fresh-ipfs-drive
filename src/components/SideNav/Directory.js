import React, { useState, useEffect } from 'react';
import { DirectoryContext }  from '@Context';
import { Record, RecordContainer } from './styles';

const Directory = () => {
  const { dir } = DirectoryContext();

  var items = dir.map((item, key) => 
    <Record>{item.name}</Record>
  );

  return(
    <RecordContainer>
      {items}
    </RecordContainer>
  )
}

export default Directory;