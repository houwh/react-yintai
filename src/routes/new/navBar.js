/**
 * Created by Administrator on 2017/6/12.
 */
import React,{Component} from "react";
import {connect} from "react-redux";
import {Popover,NavBar,Icon,Tabs} from "antd-mobile";

import Nav from "./navBar.css";

const Item = Popover.Item;
const TabPane = Tabs.TabPane;

class NewNavBar extends Component{
    /*气泡相关*/
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
    render(){
        /*气泡相关*/
        const {tabTxt,handleTabClick,tabList} = this.props;
        let offsetX = -10;
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            offsetX = -26;
        }
        return (<div>
            {/*header以及气泡效果*/}
            <NavBar className={Nav.header}
                    mode="light"
                    onLeftClick={() => window.location.hash = "#/"}
                    rightContent={
                        <Popover mask
                                 overlayClassName="fortest"
                                 overlayStyle={{ color: 'currentColor' }}
                                 visible={this.state.visible}
                                 overlay={[
                                     (<Item key="4" value="scan" icon={<Icon type={require('../../svg/share/world.svg')} size="xs" />} data-seed="logId">银泰首页</Item>),
                                     (<Item key="5" value="special" icon={<Icon type={require('../../svg/title-bar/category.svg')} size="xs" />} style={{ whiteSpace: 'nowrap' }}>分类</Item>),
                                     (<Item key="6" value="button ct" icon={<Icon type={require('../../svg/tab-bar/zhi.svg')} size="xs" />}>
                                         <span style={{ marginRight: 5 }}>购物车</span>
                                     </Item>),
                                     (<Item key="7" value="special" icon={<Icon type={require('../../svg/title-bar/user.svg')} size="xs" />} style={{ whiteSpace: 'nowrap' }}>我的银泰</Item>),
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
                抢先
            </NavBar>
           {/* tab标题分类切换*/}
            <Tabs defaultActiveKey="5" onTabClick={handleTabClick}>
                {tabTxt.map((ele,index)=>{ return <TabPane tab={ele.bargaintagname} key={ele.bargaintagtype}>
             </TabPane>
             })}

            </Tabs>
            {/*内容-商品列表*/}
            <div className={Nav.navContent}>
                <ul>
                    {
                        tabList&&tabList.map((ele,index)=>{
                            return <li key={index}>
                                <img src={ele.imgurl} alt=""/>
                                <p className={Nav.title}>{ele.name}<span>剩 <i>{Math.floor(ele.leftsecond*1/86400)}</i> 天</span></p>
                                <p className={Nav.disc}>{ele.discount}</p>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>);
    }
    componentDidMount(){
        this.props.getTabTxt();         /*获取标题分类数据*/
        this.props.getInitialList();    /*获取初始列表数据*/
    }
}

function mapStateToProps(state){
    return {
        tabTxt:state.NavReducer.tabTxt,             /*标题分类数据*/
        tabList:state.NavReducer.getTabList,        /*列表数据*/
        getTabList3:state.NavReducer.getTabList3    /*特卖爆推*/
    }
}
function mapDispatchToProps(dispatch){
    return {
        getTabTxt(){
            /*获取标题分类数据*/
            fetch("/ashx?r=0.30309134262153425&methodName=products.getbargaintaglist_1.0.0&method=products.getbargaintaglist&ver=2.1")
                .then(res=>{
                    return res.json()
                })
                .then(data=>{
                    //console.log(data.data)
                    dispatch({type:"getTabTxt",msg:data.data})
                })
        },
        getInitialList(){
            /*获取初始列表数据*/
            fetch("/ashx?r=0.1774292743172592&type=5&page_index=1&displaycount=30&methodName=products.limitbuy_1.2.0&method=products.limitbuy&ver=2.1")
                .then(res=>res.json())
                .then(data=>{
                    dispatch({type:"getTabList",msg:data.data.activityinfo[0].activitylist})
                })
        },
        handleTabClick(key) {
            /*点击切换列表数据*/
            if(key==3){
                /*特卖爆推*/
                fetch("/ashx?r=0.37782889604419534&type=3&pageindex=1&pagesize=30&methodName=products.getrecommendedproductlist_1.2.0&method=products.getrecommendedproductlist&ver=2.1")
                    .then(res=>res.json())
                    .then(data=>{
                        dispatch({type:"getTabList3",msg:data.data.productlist})
                    })
            }else{
                /*其他*/
                //console.log(key)
                fetch("/ashx?r=0.1774292743172592&type="+key+"&page_index=1&displaycount=30&methodName=products.limitbuy_1.2.0&method=products.limitbuy&ver=2.1")
                    .then(res=>res.json())
                    .then(data=>{
                        //console.log(data)
                        data.data.activityinfo[0]?dispatch({type:"getTabList",msg:data.data.activityinfo[0].activitylist}):dispatch({type:"getTabList",msg:data.data.activityinfo[0]})

                    })
            }
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewNavBar);


