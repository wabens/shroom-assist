import React from 'react';
import TableDrawer from '../TableDrawer/TableDrawer';
import TaskCreator from '../TaskCreator/TaskCreator';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  <div>
    <TableDrawer/>
    <TaskCreator/>

  </div>
);

export default InfoPage;
