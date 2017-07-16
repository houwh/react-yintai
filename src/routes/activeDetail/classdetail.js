import React,{Component} from "react";
import { NavBar, Icon } from 'antd-mobile';
import "./classdetail.css";
import "../../components/reset.css";

class ClassDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      title:"11",
      goodsData:[]
    }
  }
  componentDidMount(){
    var classID=window.location.href.split("w_id=")[1].slice(0,8);
    var newTitle=window.location.href.split("&")[1].split("w_title=")[1];
    this.setState({
      title:newTitle
    });
    var url = `/ashx?r=2017061620&method=products.getlist&ver=2.1&data={"order_type":0,"page_index":1,"displaycount":30,"query_string":"N=${classID}","keyword":""}`;
    fetch(url,{timeout:20000})
    .then((res)=>res.json())
    .then((data)=>{
      this.setState({goodsData:data.data.product_list});
    })
  }
  render(){
    return(
      <div id = "classdetail">
      <NavBar
      mode="light"
      onLeftClick={() => window.history.go(-1)}
      rightContent={[
        <Icon key="1" type="ellipsis" />,
      ]}
    >{this.state.title}</NavBar>
    <ul className = "w_tab">
      <li>默认</li>
      <li>销量</li>
      <li>价格</li>
      <li>折扣</li>
      <li>筛选</li>
    </ul>
    <ul className="w_classul">
      {this.state.goodsData.map(function(ele,index){
        return <li key={index}><img src={ele.image} alt=""/><p>{ele.name}</p><s>￥{ele.price.toFixed(2)}</s><b>￥{ele.yt_price.toFixed(2)}</b></li>
      })}
    </ul>
    </div>
    )
  }
}

export default ClassDetail
