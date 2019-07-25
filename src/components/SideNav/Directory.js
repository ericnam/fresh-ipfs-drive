import React, { useState, useEffect } from 'react';
import { DirectoryContext }  from '@Context';

const Directory = () => {
  const { dir, AddFile } = DirectoryContext();

  var items = dir.map((item, key) => 
    <div>{key} {item.name}</div>
  );

  return(
    <div>
      {items}
    </div>
  )
}

export default Directory;