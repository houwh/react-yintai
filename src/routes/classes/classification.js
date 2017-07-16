/**
 * Created by Administrator on 2017/6/12.
 */
import React,{Component} from 'react'
import {Icon,Toast} from 'antd-mobile';
import {Link}  from "react-router";
import {Header,Content} from "../../components/common/common";
import * as url from "../../urls/urlFication";
import Class from "./classification.css";

const ClassInput = (props)=>{
    return <div className="class-input">
        <div className="class-txt">
            <input type="text" placeholder="搜索商品or品牌"/>
            <span className="class-icon"><Icon type={require('../../svg/title-bar/search.svg')} size="xs" /></span>
        </div>

    </div>
};

const Classify = (props)=>{
    return <ul className="class-ul">
        {
            props.listData.map((ele,index)=>{
                return <li className={props.active == index?"active":""} key={index} onClick={()=>props.tabCommodity(ele.id,index)}>{ele.name}</li>
            })
        }
    </ul>
};

var jsump = null;

class Classification extends Component{
    categoryrecommend(ele){
        jsump = ele.jumpurl.split("=")[2].split("&")[0];
    }
    tabCommodity(id,index){
        /**点击切换商品**/
        Toast.loading("加载中...");
        fetch(url.serverData+id)
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                console.log(data.data);
                Toast.hide();
                this.setState({
                    commodity:data.data.recommend.categoryrecommend,
                    brandrecommend:data.data.brand.brandrecommend,
                    morerecommend:data.data.more.morerecommend
                })

            });
        this.setState({active:index})
    }

    constructor(props){
        super(props);
        this.state={
            listData:[],
            commodity:[],
            brandrecommend:[],
            morerecommend:[],
            categoryid:88,
            active : 0
        };
        this.tabCommodity = this.tabCommodity.bind(this)
    }
    render() {
        const {commodity,brandrecommend,morerecommend} = this.state;
        return (
            <div className={Class.class}>
                 <Header title="分类"/>
                <Classify active={this.state.active}
                          listData={this.state.listData}
                          tabCommodity={this.tabCommodity}>
                </Classify>
                <Content>
                     <ClassInput/>
                     <div className="class-commodity">
                         <p className="class-p">推荐类目</p>
                         <ul>
                             {
                                    commodity.map((ele,index)=>{
                                     return <li key={index} onClick={()=>this.categoryrecommend(ele)}>
                                         <Link to={`/list/${ele.jumpurl.split("=")[2].split("&")[0]}$title=${ele.name}`}>
                                            <img src={ele.imageurl} alt=""/>
                                            <p className="class-name">{ele.name}</p>
                                         </Link>
                                     </li>
                                 })
                             }
                         </ul>
                         <p className="class-p">推荐品牌</p>
                         <ul className="class-brandre">
                             {
                                 brandrecommend.map((ele,index)=>{
                                     return <li>
                                         <img src={ele.imageurl} alt=""/>
                                     </li>
                                 })
                             }
                         </ul>
                         <p className="class-p">更多类目</p>
                         <ul className="class-morere">
                             {
                                 morerecommend.map((ele,index)=>{
                                     return <li key={index}>{ele.name}</li>
                                 })
                             }
                         </ul>
                     </div>
                 </Content>

            </div>
        )
    }
    componentDidMount(){
        /**分类链表接口，点击获取id**/
        fetch(url.serverRoot)
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                this.setState({
                    listData:data.data.data
                })
            });
        /**分类商品接口，获取图片等价格等**/
        Toast.loading("加载中...");
        fetch(url.serverData+this.state.categoryid)
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                Toast.hide();
                this.setState({
                    commodity:data.data.recommend.categoryrecommend,
                    brandrecommend:data.data.brand.brandrecommend,
                    morerecommend:data.data.more.morerecommend
                })
            })
    }

}

export default Classification;

