import React from 'react';
// import FriendList from './compenents/FriendList';
// import FriendListProps from './compenents/FriendListProps';
import FriendList2 from './compenents/FriendList2';
// import datas from './compenents/datas/friends1';
import datas from './compenents/datas/friends2';

function App() {
  return (
    <div className="App">
      <h1>hi, react!</h1>
      {/* <FriendList /> */}
      {/* <FriendListProps datas={datas} name='列表渲染'/> */}
      <FriendList2 datas={datas} name='列表渲染'/>
    </div>
  );
}

export default App;
