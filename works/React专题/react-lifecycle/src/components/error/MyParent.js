import React from 'react';

import MyChild from './MyChild';
import ErrorBoundry from './ErrorBoundry';

class MyParent extends React.Component{
    render(){
        return (
            <div>
                <h1>这是父级MyParent</h1>
                <ErrorBoundry>
                    <MyChild />
                </ErrorBoundry>
            </div>
        );
    }
}

export default MyParent;