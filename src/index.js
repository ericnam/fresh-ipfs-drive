import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import SideNav from '@Components/SideNav';
import { DirectoryContext }  from '@Context';
import '@Styles/App.scss';

render(
  <DirectoryContext.Provider>
    <SideNav />
  </DirectoryContext.Provider>,
  document.getElementById('root')
)