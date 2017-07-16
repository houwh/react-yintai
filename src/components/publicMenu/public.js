/**
 * Created by Administrator on 2017/6/14.
 */
import React,{Component} from "react";
import {hashHistory} from "react-router";
import { TabBar, Icon } from 'antd-mobile';

/*底部切换菜单*/
class Public extends Component{
    state = {
        selectedTab: 'home',
        hidden: false,
    };
    render(){
        const pathName = this.props.location.pathname;  /*获取当前路径*/
        return (
            <TabBar
                unselectedTintColor="#949494"    /*未选中的字体颜色*/
                tintColor="#e5004f"              /*选中的字体颜色*/
                barTintColor="white"              /* tabbar 背景色 */
                hidden={this.state.hidden}
            >
                <TabBar.Item
                    title="首页"
                    key="首页"
                    icon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
                    />
                    }
                    selected={pathName === '/' || pathName === '/active'}  /*判断是否选中*/
                    onPress={() => {
                        hashHistory.push("/")
                    }}
                >
                    {this.props.children}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon type="koubei-o" size="md" />}
                    selectedIcon={<Icon type="koubei" size="md" />}
                    title="抢先"
                    key="抢先"
                    selected={pathName === '/new'}
                    onPress={() => {
                        hashHistory.push("/new")
                    }}
                >
                    {this.props.children}
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat' }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat' }}
                        />
                    }
                    title="分类"
                    key="分类"
                    selected={pathName === '/class'}
                    onPress={() => {
                        hashHistory.push("/class")
                    }}
                >
                    {this.props.children}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                    title="购物车"
                    key="购物车"
                    selected={pathName === '/cart' || pathName === '/account'}
                    onPress={() => {
                        hashHistory.push("/cart")
                    }}
                >
                    {this.props.children}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                    title="我的银泰"
                    key="我的银泰"
                    selected={pathName === '/mine'}
                    onPress={() => {
                        hashHistory.push("/mine")
                    }}
                >
                    {this.props.children}
                </TabBar.Item>
            </TabBar>
        );
    }
}

export default Public;