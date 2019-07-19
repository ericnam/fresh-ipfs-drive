import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import SideNav from '@Components/SideNav';
import { IPFSContext }  from '@Context';
import '@Styles/App.scss';

render(
  <IPFSContext.Provider>
    <SideNav />
  </IPFSContext.Provider>,
  document.getElementById('root')
)