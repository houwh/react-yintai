import React,{Component}from "react";
import { NavBar, Icon,Toast} from 'antd-mobile';
import {Link} from "react-router"
import "./huodongList.css"
import "../../components/reset.css"

class HuodongList extends Component {
  constructor(props){
    super(props);
    this.state={
        pageData:[],
        activetitle:"活动页",
        imgBig:'',
        jxhh:'',
        jxhh1:[],
        pp:'',
        pp1:[],
        pp2:[],
        pp3:[],
        pp4:[],
        xx1:'',
        xx2:'',
        xx3:'',
        xx4:'',
        tz0:'',
        tz1:'',
        tz2:'',
        tz3:'',
    }
  }
  componentWillMount(){

    if(!this.state.pageData.length){
        Toast.loading("加载中...",1);
         //没有数据，再获取
    fetch(`/ashx?r=201706131715&os=HTML5&client_v=1.0.0&pageid=30002135&previewtime=0&methodName=products.template.getpage_1.0.0&method=products.template.getpage&apptype=10&ver=1.0.0&pageindex=1`,{timeout:20000})
    .then(res=>res.json())
    .then(data=>{
        this.setState({pageData:data});

    this.state.activetitle=this.state.pageData.data.pagetitle;
    this.state.jxhh=this.state.pageData.data.templatelist[1].items[0].imgurl;
    this.state.pp=this.state.pageData.data.templatelist[3].items[0].imgurl;
    this.state.pp1=this.state.pageData.data.templatelist[4].items;
    this.state.pp2=this.state.pageData.data.templatelist[5].items;
    this.state.pp3=this.state.pageData.data.templatelist[6].items;
    this.state.pp4=this.state.pageData.data.templatelist[7].items;
    this.state.xx1=this.state.pageData.data.templatelist[8].items[0].imgurl;
    this.state.xx2=this.state.pageData.data.templatelist[9].items[0].imgurl;
    this.state.xx3=this.state.pageData.data.templatelist[10].items[0].imgurl;
    this.state.xx4=this.state.pageData.data.templatelist[11].items[0].imgurl;
    this.state.tz0=this.state.pageData.data.templatelist[8];
    this.state.tz1=this.state.pageData.data.templatelist[9];
    this.state.tz2=this.state.pageData.data.templatelist[10];
    this.state.tz3=this.state.pageData.data.templatelist[11];

    this.setState({
          imgBig:this.state.pageData.data.templatelist[0].items[0].imgurl,
          jxhh1:this.state.pageData.data.templatelist[2].items
    })

    });
  }
  }
  w_tz=function(jumpUrl,name){
    var w_id=jumpUrl.split("N%3D")[1].slice(0,8);
    var w_title = name;
    var s = `w_id=${w_id}&w_title=${w_title}`;
    return s
  };
  render(){
    const{activetitle} = this.state;
    return(
      <div id = "huodongList">
        <NavBar
             mode="light"
             onLeftClick={() => window.history.go(-1)}
             rightContent={[
               <Icon key="1" type="ellipsis" />,
             ]}
           >{activetitle}</NavBar>
        {this.state.tz0.items?<div>
        <div className="w_img"><img src={this.state.imgBig} /></div>
        <div className="w_jx"><img src={this.state.jxhh} alt=""/></div>

        <ul className="w_ul1">
          {this.state.jxhh1.map(function(ele,index){return<li key={index}><img src={ele.imgurl} /><div><p>{ele.extra.productdetail.name}</p><em>￥{ele.extra.productdetail.price}.00</em></div></li>})}
        </ul>
        <div className="w_pp"><img src={this.state.pp} alt=""/></div>
        <ul className="w_pp1">
          {this.state.pp1.map(function(ele,index){return<li key={index}><img src={ele.imgurl} /></li>})}
        </ul>
        <ul className="w_pp1">
          {this.state.pp2.map(function(ele,index){return<li key={index}><img src={ele.imgurl} /></li>})}
        </ul>
        <ul className="w_pp1">
          {this.state.pp3.map(function(ele,index){return<li key={index}><img src={ele.imgurl} /></li>})}
        </ul>
        <ul className="w_pp1">
          {this.state.pp4.map(function(ele,index){return<li key={index}><img src={ele.imgurl} /></li>})}
        </ul>
        <div className="w_xx">
            <Link to={"/classdetail?"+this.w_tz(this.state.tz0.items[0].jumpurl,this.state.tz0.templatename)}>
          <img src={this.state.xx1} alt=""/>
          </Link>
        </div>
        <div className="w_xx">
          <Link to={"/classdetail?"+this.w_tz(this.state.tz1.items[0].jumpurl,this.state.tz1.templatename)}>
          <img  src={this.state.xx2} alt=""/>
        </Link>
        </div>
        <div className="w_xx">
          <Link to={"/classdetail?"+this.w_tz(this.state.tz2.items[0].jumpurl,this.state.tz2.templatename)}>
          <img  src={this.state.xx3} alt=""/>
        </Link>
        </div>
        <div className="w_xx">
          <Link to={"/classdetail?"+this.w_tz(this.state.tz3.items[0].jumpurl,this.state.tz3.templatename)}>
          <img  src={this.state.xx4} alt=""/>
        </Link>
        </div>
      </div>:''}
      </div>
    )
  }
}
export default HuodongList
