import React from 'react';
import './App.css';

import BaseRouter from './components/BaseRouter';
// 导入 BrowserRouter 组件，并命名 Router 别名，方便使用
import { BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>React-Router</h1>
      <hr />
      <Router>
        <BaseRouter/>
      </Router>
    </div>
  );
}

export default App;
