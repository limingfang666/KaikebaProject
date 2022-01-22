import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { number } from 'prop-types';
/**
 * 场景七：分页组件
 */
class Pagenation extends React.Component {
    constructor(props) {
        super(props);
    }

    //设置总页数和页码的初始值和类型验证
    static defaultProps = {
        pages: 1,
        page: 1
    };
    static propTypes = {
        pages: number.isRequired,
        page: number.isRequired
    };

    render() {
        let { pages, page, history: { push } } = this.props;
        return (
            <div className="pagination">
                {
                    (new Array(pages)).fill('').map((v, i) => {
                        return (
                            <Link
                                key={++i}
                                className={i === page ? 'active' : ''}
                                to={'/' + i}
                            >
                                {i}
                            </Link>
                        );
                    })
                }
                前往
                <input type="text" className="goto" onKeyDown={({ target: { value } }) => {
                    if (value !== '') {
                        push('/' + value);
                    }
                }} />
                页
            </div>
        );
    }
}
 //通过使用withRouter就不需要一层层传递props属性，可直接在此获取,否则history等信息需要从Home组件传过来
export default withRouter(Pagenation);