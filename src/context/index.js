// import { createStore, applyMiddleware } from 'redux';
// import reducers from '@Reducer';
// import thunk from 'redux-thunk';

// export default createStore(
//   reducers,
//   applyMiddleware(thunk)
// );

import { useState } from "react";
import createUseContext from "constate"; // State Context Object Creator

const root = {
  type: '',
  name: 'root',
  path: '/',
  size: 0,
  date: '',
  synced: false,
  syncing: false
}

// Step 1: Create a custom hook that contains your state and actions
const useIPFS = () => {
  const [dir, updateDir] = useState(JSON.stringify({root}));

  const AddFile = (newEntry) => {
    updateDir(prevDirStr => { 
      var prevDir = JSON.parse(prevDirStr);
      // check location of file added, add in appropriate spot in obj
      prevDir.push(newEntry); 
    });
  };

  return { dir, AddFile };
}

// Step 2: Declare your context state object to share the state with other components
export const IPFSContext = createUseContext(useIPFS);