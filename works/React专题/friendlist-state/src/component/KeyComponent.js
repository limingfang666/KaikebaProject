import React from 'react';

class KeyComponent extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            arr: ['html', 'css', 'javascript']
        }
        this.sort = this.sort.bind(this);
    }

    sort() {
        this.setState({
            arr: this.state.arr.sort( _ => Math.random() - .5 )
        });
    }

    render() {
        let {arr} = this.state;
        return(
            <div>
                <ul>
                    {arr.map( (v, k) => (
                        //在map循环中加上key={v}即可
                        <li key={v}>
                            <input type="checkbox"/>
                            <span>{v}</span>
                        </li>
                    ) )}
                </ul>
                <button onClick={this.sort}>乱序</button>
            </div>
        );
    }
}

export default KeyComponent;