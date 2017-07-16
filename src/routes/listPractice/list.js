/**
 * Created by Administrator on 2017/6/14.
 */
import React,{Component} from "react";
import {connect} from "react-redux";
import {NavBar,Icon,ListView,RefreshControl,Toast} from 'antd-mobile';
import List from "./list.css";

/*渲染滚动区域的内容=>自动进行遍历*/
const renderRow = (rowData,sID,rID)=>{
    return <div>
        <ul className={List.listBox}>
            <li>
                <img src={rowData.image} alt=""/>
                <div>
                    <p className={List.title}>{rowData.name}</p>
                    {rowData.promotionlabel?<p className={List.label}>{rowData.promotionlabel}</p>:""}
                    <span>￥{rowData.price}</span>
                    <p className={List.price}>￥{rowData.promotion_price}</p>
                </div>
            </li>
        </ul>
    </div>
};

class ListPage extends Component{
    state={
        page:1,
        refreshing:false
    };
    render(){
        const {initialData} = this.props;
        /*创建一个ListView.DataSource的实例，为了生成dataSource数据*/
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        /*滚动区域的数据需要用ds包装，不能直接使用一个数据*/
        const dataSource = ds.cloneWithRows(initialData);

        return <div>
            {/*列表头部*/}
            <NavBar leftContent="back"
                    mode="light"
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
            >列表</NavBar>
            <ListView
                /*设置滚动区域的高度*/
                style={{
                    height:document.documentElement.clientHeight-(190*window.devicePixelRatio/2)
                }}

                /*初始页数据数量*/
                initialListSize={5}

                /*每页更新数量*/
                pageSize={5}

                renderHeader={()=><div>Header</div>}
                renderFooter={()=><div>Footer</div>}

                /*获取数据*/
                dataSource = {dataSource}

                /*使用自定义滚动条，默认不显示滚动条*/
                useZscroller={true}

                /*滚动条配置=>显示滚动条*/
                scrollerOptions={{ scrollbars: true }}

                /*渲染每一行*/
                renderRow={renderRow}

                /*上拉加载=>当所有行被渲染且列表已滚动到底部时调用*/
                onEndReached={()=>this.loadMore()}  //注意this指向=>箭头函数

                /*临界 距离底部的距离=>10个像素*/
                onEndReachedThreshold={10}

                /*下拉刷新   refreshControl=>下拉刷新的控件*/
                refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={()=>{this.onRefresh()}}
                />}
            />
        </div>
    }
    onRefresh(){
        //console.log("刷新");
        //开始刷新  refreshing =》true
        this.setState({
            refreshing:true
        });
        //重新获取初始的数据  实现刷新
        this.props.dispatch(getInitialData(()=>{
            //console.log("刷新结束");
            //获取成功以后，结束刷新状态  refreshing=>false
            this.setState({
                refreshing:false,
                page:1          ////刷新后重置page，否则page数量会继上一次累积；
            })
        }))
    }
    loadMore(){
        var num = this.state.page;

        //判断数据是否全部加载完成
        if(num>=5){return}

        /*this.loading 首次为false,不执行*/
        if(this.loading){return}
        this.loading = true;

        this.setState({
            page:++num
        });

        console.log("more");
        console.log(num);
        Toast.loading("加载中...",1);
        this.props.dispatch(getMoreData(num,()=>{this.loading=false}))
    }
    componentDidMount(){
        /*引入connect,this.props自带dispatch属性*/
        this.props.dispatch(getInitialData())
    }
}

/*动态生成的action creater => 获取初始列表数据*/
const getInitialData = (callback)=>(dispatch)=>{
    fetch("/ashx?r=201706150805&method=products.getlist&ver=2.1&data=%7B%22order_type%22%3A0%2C%22page_index%22%3A1%2C%22displaycount%22%3A30%2C%22query_string%22%3A%22N%3D10001907%22%2C%22keyword%22%3A%22%22%7D")
        .then(res=>res.json()).then(data=>{
        callback&&callback();               //判断有callback则调用；
        dispatch({type:"getInitialData",msg:data.data.product_list})
    });
};

/*加载更多数据*/
const getMoreData = (page,callback)=>(dispatch)=>{
    fetch("/ashx?r=201706150805&method=products.getlist&ver=2.1&data=%7B%22order_type%22%3A0%2C%22page_index%22%3A"+page+"%2C%22displaycount%22%3A30%2C%22query_string%22%3A%22N%3D10001907%22%2C%22keyword%22%3A%22%22%7D")
        .then(res=>res.json()).then(data=>{
        callback();
        dispatch({type:"getMoreData",msg:data.data.product_list})
    });
};

export default connect(state=>{
    return {
        initialData:state.ListReducer.getInitialData,
    }
})(ListPage);