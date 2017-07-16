/**
 * Created by Administrator on 2017/6/15.
 */
{/* <div className={Cart.blankCart}>
 <img src={require("../../img/clearcart2.png")} alt=""/>
 <p>购物车空空哒！</p>
 <p>快去随便逛逛吧~</p>
 <a href="#/">随便逛逛</a>
 </div>*/}


<div className={Cart.buynum}>
    <button>-</button>
    <input type="text" value="1"/>
    <button>+</button>
</div>

const save = localStorage.getItem("goods");
if(!save){
    console.log("")
    localStorage.setItem("goods",data)
}else{
    console.log(save)
}

/**
 * Created by Administrator on 2017/6/14.
 */
import React,{Component} from "react";
import {connect} from "react-redux";
import {NavBar,Icon,SwipeAction,Stepper} from "antd-mobile";
import "antd-mobile/lib/stepper/style/assets/plus.svg";
import "antd-mobile/lib/stepper/style/assets/minus.svg";

import Cart from "./cart.css";
var sd = require("../../svg/my/home.svg");

/*购物车数据渲染*/
class CartList extends Component{
    constructor(props){
        super(props)
        this.state={
            val:1
        }
    }
    render(){
        const {cartData,onClick,delGood,checkALl,account} = this.props;
        return <div className={Cart.goodsCart}>
            <ul>
                {
                    cartData&&cartData.map((ele,index)=>{
                        return <SwipeAction key={index}
                                            className={Cart.swipers}
                                            autoClose
                                            right={[
                                                {
                                                    text: '取消',
                                                    style: { backgroundColor: '#ddd', color: 'white' },
                                                },
                                                {
                                                    text: '删除',
                                                    onPress: () => {delGood(ele.itemid,index)},
                                                    style: { backgroundColor: '#F4333C', color: 'white'},
                                                }
                                            ]}
                        >
                            <li>
                                <div className="checkBox" onClick={onClick}>
                                </div>
                                <img src={ele.imgurl} alt=""/>
                                <div className={Cart.bigPart}>
                                    <dl>
                                        <dt>{ele.extra.productdetail.name}</dt>
                                        <dd>{ele.extra.productdetail.marketprice}</dd>
                                        <dd className={Cart.allNum}>X{ele.extra.productdetail.operatemode}</dd>
                                    </dl>
                                    <p className={Cart.price}>￥{ele.extra.productdetail.price}</p>
                                    <Stepper
                                        style={{ width: '100%', minWidth: '2rem' }}
                                        showNumber
                                        max={10}
                                        min={1}
                                        value={this.state.val}
                                        onChange={(num)=>this.onChange(num,ele.itemid,index)}
                                    />

                                </div>
                            </li>
                        </SwipeAction>
                    })
                }
            </ul>
            {/*合计*/}
            <div className={Cart.allInAll}>
                <div>
                    <span
                        className="checkAll"  onClick={checkALl}>
                    </span>
                    <p>全选</p>
                </div>
                <div>
                    <p>合计：<span>￥</span></p>
                    <p>已满199元，免运费</p>
                </div>
                <button onClick={account}>去结算</button>
            </div>
        </div>
    }
    onChange(num,id,index){
        console.log(num)
        this.setState({
            val:num
        })
        /*console.log(num,id,index);*/   //数量，商品id，li下标；
        //console.log(this.props.cartData[index])  //商品信息

    }
}

/*页面渲染*/
class CartPage extends Component{
    state={
        cartData:[],
        val:1
    };
    render(){
        return <div>
            <NavBar className={Cart.header}
                    leftContent={<Icon type={sd} size="xs"/>}
                    mode="light"
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent="编辑"
            >购物车</NavBar>

            <CartList delGood={this.delGood.bind(this)} cartData={this.state.cartData} onClick={this.checkon} checkALl={this.checkALl} account={this.account}/>
        </div>
    }
    account(){
        window.location.hash="#/account"
    }
    checkALl(ev){
        if(ev.target.className=="activeA"){
            ev.target.className="checkAll"
        }else{
            ev.target.className="activeA"
        }
        console.log(JSON.parse(localStorage.getItem("cartGoods")))
    }
    delGood(id,index){
        console.log(id,index);
        console.log(this.state);
        this.setState({
            cartData:this.state.cartData.splice(index,1)
        });
        console.log(this.state);
    }
    checkon(ev){
        console.log(ev.target);
        if(ev.target.className=="active"){
            ev.target.className="checkBox"
        }else{
            ev.target.className="active"
        }

    }
    componentDidMount(){

        const data = JSON.parse(localStorage.getItem("cartGoods"))[0];
        console.log(data)
        fetch("/ashx?r=201706132108&os=HTML5&client_v=1.0.0&pageid=104001&previewtime=0&methodName=products.template.getpage_1.0.0&method=products.template.getpage&apptype=10&ver=1.0.0&pageindex=1").then(res=>res.json()).then(data=>{
            //console.log(data.data.templatelist[3].items)
            this.setState({
                cartData:data.data.templatelist[3].items
            })
        })
    }
}

/*
 export default connect(state=>{
 return {
 /!*cartData:state.HomeReducer.cartData*!/
 cartData:[]
 }
 })(CartPage);*/
export default CartPage;



