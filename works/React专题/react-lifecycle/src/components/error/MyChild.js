import React from 'react';

class MyChild extends React.Component{
    
    render(){
        let obj = {
            x:12
        }
        return(
            <div>
                <h2>这是子级MyChild</h2>
                {/* 对象不能直接输出所以会出错 */}
                {obj}
            </div>
        );
    }
}
export  default MyChild;