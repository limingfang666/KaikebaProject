import React from 'react';
import './App.css';

import Dialog from './components/Dialog';

function App() {

  return (
    <div className="App">
      <Dialog>
        {/* 整个form表单都是作为内容传递给子组件Dialog，子组件通过this.props.children可以得到整个form表单结构 */}
        <form id="dialog_form" method="post">
          用户名：<input type="text" name="name" />
        </form>
      </Dialog>
    </div>
  );
}

export default App;
