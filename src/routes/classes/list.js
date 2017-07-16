/**
 * Created by Administrator on 2017/6/13.
 */
import React,{Component} from "react"
import {Drawer,List,Accordion ,Toast,ListView} from 'antd-mobile';
import {Link}  from "react-router";
import {Header,Content} from "../../components/common/common"
import {connect} from "react-redux"
import "./list.css"

const RenderRow = (listData)=>{
    return <ul className="list-shop">
                <Link to={`/details/${listData.itemcode}`}>
                     <li>
                        <img src={listData.midimageurl} alt=""/>
                        <div className="list-shop-div">
                            <p>{listData.name}</p>
                            <p>¥{listData.price}</p>
                            <p>¥{listData.promotion_price}.00</p>
                        </div>
                    </li>
                </Link>
             </ul>
};

class ListData extends Component{
    getSalesvolume(id){
        Toast.loading("加载中...");
        fetch(`/ashx/?r=2017061515&method=products.getlist&ver=2.1&data=%7B%22order_type%22%3A5%2C%22page_index%22%3A1%2C%22displaycount%22%3A30%2C%22query_string%22%3A%22${id}%22%2C%22keyword%22%3A%22%22%7D`)
            .then(res=>res.json())
            .then(data=>{
                Toast.hide();
                this.props.dispatch({type:"getCartDataAction",listData:data.data.product_list})
            })
    }
    getlistPrive(id){
        Toast.loading("加载中...");
        fetch(`/ashx/?r=2017061515&method=products.getlist&ver=2.1&data=%7B%22order_type%22%3A3%2C%22page_index%22%3A1%2C%22displaycount%22%3A30%2C%22query_string%22%3A%22${id}%22%2C%22keyword%22%3A%22%22%7D`)
            .then(res=>res.json())
            .then(data=>{
                Toast.hide();
                this.props.dispatch({type:"getCartDataAction",listData:data.data.product_list})
            })
    }
    getlistDiscount(id){
        Toast.loading("加载中...");
        fetch(`/ashx/?r=2017061515&method=products.getlist&ver=2.1&data=%7B%22order_type%22%3A7%2C%22page_index%22%3A1%2C%22displaycount%22%3A30%2C%22query_string%22%3A%22${id}%22%2C%22keyword%22%3A%22%22%7D`)
            .then(res=>res.json())
            .then(data=>{
                Toast.hide();
                this.props.dispatch({type:"getCartDataAction",listData:data.data.product_list})
            })
    }
    state = {
        6: false,
        position: 'left',
        pageNum:1,
        title:[],
        span:[],
        id:"",
        tit:""
    };
    Salesvolume(index){
        switch (index){
            case 1:
                this.getSalesvolume(this.state.id);
                break;
            case 0:
                this.getInitData(this.state.id);
                break;
            case 2:
                this.getlistPrive(this.state.id);
                break;
            case 3:
                this.getlistDiscount(this.state.id);
                break;
            case 4:
                this.setState({ open: !this.state.open });
                break;

        }
    }
    static defaultProps = {
        listFen:["默认","销量","价格","折扣","筛选"]
    };
    render(){
        const sidebar = (<List>{
            this.props.filter.map((ele, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                                       multipleLine
                    ><div className="list-sidebar">
                        <p>全部商品</p>
                        <p>专柜同款</p>
                    </div></List.Item>);
                }
                return (
                    <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header={<div><span>{ele.title}</span><span>{this.state.span}</span></div>}
                                         className="pad">
                            <List className="my-list">
                                {
                                    ele.items.map((ele,index)=>{
                                        return <List.Item onClick={()=>this.clickSpan(ele.name,index)} key={index}>{ele.name}</List.Item>
                                    })
                                }
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                )
            })}
            </List>);
        const drawerProps = {
            open: this.state.open,
            position: this.state.position,
            onOpenChange: this.onOpenChange,
        };
        const {listFen,listData} = this.props;
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        const dataSource = ds.cloneWithRows(listData);
        return(
                <div>
                    <Header title={this.state.tit}/>
                    <Content>
                        <ul className="list-top">
                            {
                                listFen.map((ele,index)=>{
                                    return <li key={index} onClick={()=>this.Salesvolume(index)}>{ele}</li>
                                })
                            }
                            <Drawer
                                className="my-drawer"
                                style={{ minHeight: document.documentElement.clientHeight,paddingTop:-200,}}
                                dragHandleStyle={{ display: 'none' }}
                                contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                                sidebar={sidebar}
                                {...drawerProps}
                            >
                                Click upper-left corner icon
                            </Drawer>
                        </ul>
                        <ListView
                            style={{
                                height:document.documentElement.clientHeight-(90*window.devicePixelRatio/2)
                            }}
                            initialListSize={5}
                            pageSize={5}
                            dataSource={dataSource}
                            useZscroller={true}
                            renderRow={RenderRow}
                            scrollerOptions={{ scrollbars: true }}
                            onEndReached={()=>{this.loadMore()}}
                            onEndReachedThreshold={10}
                        />
                    </Content>
                </div>
            )
        }
        loadMore(){
        var num = this.state.pageNum;
        if(num*10>=30){ //this.props.total
            //说明数据已经加载完了
            Toast.info('没有更多数据!!!', 2, null, false);
            return
        }
        //如果正在加载就不执行下一次加载
        if(this.loading){ return }
        this.loading =true; //开始要加载
        this.setState({
            pageNum:++num
        });
        this.props.dispatch(getProductMoreData(this.state.id,num,()=>{this.loading=false}))
    }
        componentDidMount(){
            var id = this.props.params.goodsID.split("$");
            var tit = id[1].split("=")[1];
            this.setState({id:id[0],tit:tit});
            Toast.loading("加载中...");
            this.props.dispatch(getProductData(id[0]))
        }
    }

const getProductMoreData = (id,num,callback)=>{
    return function(dispatch){
        return fetch(`/ashx/?r=201706151603&method=products.getlist&ver=2.1&data=%7B%22order_type%22%3A0%2C%22page_index%22%3A${num}%2C%22displaycount%22%3A30%2C%22query_string%22%3A%22${id}%22%2C%22keyword%22%3A%22%22%7D`)
            .then(res=>res.json())
            .then(data=>{
                callback();
                dispatch({type:"getProductListDataMore",listData:data.data.product_list})
            })
    }
};

const getProductData = (id)=>{
    return function(dispatch){
        Toast.loading("加载中...");
        return fetch(`/ashx/?r=201706151402&method=products.getlist&ver=2.1&data=%7B%22order_type%22%3A0%2C%22page_index%22%3A1%2C%22displaycount%22%3A30%2C%22query_string%22%3A%22${id}%22%2C%22keyword%22%3A%22%22%7D`)
            .then(res=>res.json())
            .then(data=>{
                Toast.hide();
                var fite = data.data.filter_group;
                dispatch({type:"getCartDataAction",listData:data.data.product_list});
                dispatch({type:"getCartDatafilter",filter:fite})
            })
    }
};

export default connect(state=>{
    return {
        listData:state.ListReducer.listData,
        filter:state.ListReducer.filter
    }
})(ListData)

