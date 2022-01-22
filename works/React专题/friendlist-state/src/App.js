import React from 'react';
import './App.css';

import FriendList from './component/FriendList_state_improve';
import datas from './datas/friends_list';
import KeyComponent from './component/KeyComponent';

function App() {
  return (
    <div className="App">
      <FriendList datas={datas} />
      <KeyComponent />
    </div>
  );
}

export default App;
