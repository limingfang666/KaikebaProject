import React from 'react';
import logo from './logo.svg';
import './App.css';

import FriendListFunc from './components/friendlist_func';
import FriendListClass from './components/friendlist_class';
//通过属性将外部数据传入组件
import FriendFuncData from './datas/friends_Func'

//通过属性将外部数据传入组件
import FriendClassData from './datas/friends_class'

function App() {
  return (
    <div className="App">
      <FriendListFunc data={FriendFuncData}/>
      <hr/> 
      <FriendListClass data={FriendClassData}/>
    </div>
  );
}

export default App;
