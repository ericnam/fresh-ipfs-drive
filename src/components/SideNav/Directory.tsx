import * as React from 'react'; 
import { DirectoryContext }  from '@Context/index';
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