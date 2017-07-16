/**
 * Created by Administrator on 2017/6/17.
 */
import React,{Component} from "react";
import { Popover, NavBar, Icon } from 'antd-mobile';
import {Link} from "react-router";
import "./common.css";

const Item = Popover.Item;

/*头部*/
class Header extends Component {
    state = {
        visible: false,
        selected: '',
    };
    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    render() {
        let offsetX = -10; // just for pc demo
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            offsetX = -26;
        }
        return (<div className="header">
            <NavBar
                mode="light"
                onLeftClick = {()=>window.location.hash = "#/"}
                rightContent={
                    <Popover mask
                             overlayClassName="fortest"
                             overlayStyle={{ color: 'currentColor' }}
                             visible={this.state.visible}
                             overlay={[
                                 (<Item key="4" value="scan" icon={<Icon type={require('../../svg/title-bar/Scan.svg')} size="xs" />} data-seed="logId">扫一扫</Item>),
                                 (<Item key="5" value="special" icon={<Icon type={require('../../svg/title-bar/left.svg')} size="xs" />} style={{ whiteSpace: 'nowrap' }}>我的二维码</Item>),
                                 (<Item key="6" value="button ct" icon={<Icon type={require('../../svg/title-bar/help.svg')} size="xs" />}>
                                     <span style={{ marginRight: 5 }}>帮助</span>
                                 </Item>),
                             ]}
                             align={{
                                 overflow: { adjustY: 0, adjustX: 0 },
                                 offset: [offsetX, 15],
                             }}
                             onVisibleChange={this.handleVisibleChange}
                             onSelect={this.onSelect}
                    >
                        <div style={{
                            height: '100%',
                            padding: '0 0.3rem',
                            marginRight: '-0.3rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        >
                            <Icon type="ellipsis" />
                        </div>
                    </Popover>
                }
            >
                {this.props.title}
            </NavBar>
        </div>);
    }
}

/*内容*/
const Content = (props)=>{
    return <div id="content">
        {props.children}
    </div>
};

/*详情页添加购物车*/
class Shop extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {addCart} = this.props;
        return(
            <ul className="footer-shop">
                <Link to="/cart"><li>购物车</li></Link>
                <li onClick={addCart}>加入购物车</li>
                <li>立即购买</li>
            </ul>
        )
    }
}

export {
    Header,
    Content,
    Shop
};