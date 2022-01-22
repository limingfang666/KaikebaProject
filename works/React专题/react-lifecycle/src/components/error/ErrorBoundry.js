import React from 'react';

class ErrorBoundry extends React.Component{
    constructor(props){
        super(props);
        //static getDerivedStateFromError()方法返回值为一个对象存放在state中，所以可以在此设置错误标识
        this.state = {
            errorMsg : false
        }
    }
    static getDerivedStateFromError(error){
        //当错误边界组件包含的组件出错时会调用此方法，可将错误标识为true        
        return { errorMsg:true };
    }
    render(){
        //通过判断，如果错误弹出错误页面，否则正常显示
        if (this.state.errorMsg) {
            return <div>某个组件出错了</div>;
      }
      return this.props.children;
    }
}

export default ErrorBoundry;