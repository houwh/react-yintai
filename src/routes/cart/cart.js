/**
 * Created by Administrator on 2017/6/14.
 */
import React,{Component} from "react";
/*import {connect} from "react-redux";*/
import {NavBar,Icon,SwipeAction,Stepper,Modal} from "antd-mobile";
import "antd-mobile/lib/stepper/style/assets/plus.svg";
import "antd-mobile/lib/stepper/style/assets/minus.svg";

import Cart from "./cart.css";
const sd = require("../../svg/my/home.svg");

/*购物车数据渲染*/
class CartList extends Component{
    render(){
        const {cartData,onClick,delGood,checkALl,account,onChange} = this.props;
        var money = 0;
        /*获取购买商品总金额*/
        cartData.map((ele)=>money+=ele.msg.ytprice*ele.num);

        return <div className={Cart.goodsCart}>
            <ul>
                {/*遍历商品条目*/}
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
                                                    onPress: () => {delGood(ele.id,index)},
                                                    style: { backgroundColor: '#F4333C', color: 'white'},
                                                }
                                            ]}
                        >
                            <li>
                                <div className="checkBox" onClick={onClick}>
                                </div>
                                <img src={ele.msg.middleimgurls[0]} alt=""/>
                                <div className={Cart.bigPart}>
                                    <dl className="dlMsg">
                                        <dt>{ele.msg.name}</dt>
                                        <dd>颜色：{ele.color}</dd>
                                        <dd className={Cart.allNum}>X{ele.num}</dd>
                                    </dl>
                                    <p className={Cart.price}>￥{ele.msg.ytprice}</p>
                                    <Stepper className="step"
                                        style={{ width: '100%', minWidth: '2rem' }}
                                        showNumber
                                        max={20}
                                        min={1}
                                        value={ele.num}
                                        onChange={(num)=>onChange(num,ele.id,index)}
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
                <div id="priceAll">
                    <p>合计：<span className="totalPrice">￥{money}</span></p>
                    <p>已满199元，免运费</p>
                </div>
                <button id="accountAll" className="btnAct" onClick={account}>去结算</button>
            </div>
        </div>
    }
}

/*页面渲染*/
class CartPage extends Component{
    state={
        cartData:[],
        hide:true
    };
    render(){
        return <div>
            <NavBar className={Cart.header}
                    leftContent={<Icon type={sd} size="xs"/>}
                    mode="light"
                    onLeftClick={() => window.location.hash = "#/"}
                    rightContent={<div onClick={(ev)=>this.edit(ev)}>编辑</div>}
            >购物车</NavBar>

                <CartList delGood={this.delGood.bind(this)} cartData={this.state.cartData} onClick={this.checkon} checkALl={this.checkALl} account={this.account} onChange={this.onChange.bind(this)}/>
        </div>
    }
    edit(ev){
        /*编辑购物车*/
        const dlMsg = document.querySelectorAll(".dlMsg");   /*商品标题*/
        const actAll = document.getElementById("accountAll");   /*底部合计*/
        const priceAll = document.getElementById("priceAll");  /*去结算*/
        const step = document.querySelectorAll(".step");   /*商品数量*/

        if(this.state.hide){
            for (var i = 0; i<dlMsg.length;i++ ){
                dlMsg[i].style.display = "none"
            }
            for (var j = 0; j<dlMsg.length;j++ ){
                step[j].style.display = "block"
            }
            actAll.setAttribute("class","btnDel");
            priceAll.style.display = "none";
            ev.target.innerHTML = "完成";
            actAll.innerHTML ="删除";
            this.setState({
                hide:false
            })

        }else{
            for (var i = 0; i<dlMsg.length;i++ ){
                dlMsg[i].style.display = "block"
            }
            for (var j = 0; j<dlMsg.length;j++ ){
                step[j].style.display = "none"
            }
            actAll.setAttribute("class","btnAct");
            actAll.innerHTML ="去结算";
            priceAll.style.display = "block";
            ev.target.innerHTML = "编辑";
            this.setState({
                hide:true
            })
        }

    }
    account(){
        window.location.hash="#/account"
    }
    checkALl(ev){       //全选点击事件

        var checkon = document.querySelectorAll(".checkBox");  //选中商品集合
        var checkoff = document.querySelectorAll(".active");    //未选中商品集合
        var money = document.querySelectorAll(".totalPrice");

        if(ev.target.className=="activeA"){   //全选点击选中
            ev.target.className="checkAll";

            for(var i = 0; i< checkoff.length; i++){  //当全选选中，让所有商品成选中状态
                checkoff&&checkoff[i].setAttribute("class","checkBox")
            }
        }else{                              //全选点击取消选中
            ev.target.className="activeA";

            for(var i = 0; i< checkon.length; i++){     //选中的商品取消选中
                checkon&&checkon[i].setAttribute("class","active")
            }
        }

    }
    delGood(id,index){
        /*弹窗-删除商品*/
        const alert = Modal.alert;
        alert('温馨提示', '您确定要删除已选中的商品么?', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确定', onPress: () => {

                this.state.cartData.splice(index,1);
                this.setState({
                    cartData:this.state.cartData
                })
            }, style: { fontWeight: 'bold' } },
        ]);
    }
    onChange(num,id,index){
        /*console.log(num,id,index);*/   //数量，商品id，li下标；
        this.state.cartData[index].num = num;
        this.setState({
            cartData:this.state.cartData
        });
    }
    checkon(ev){    //单个商品点击选中事件

        var checkon = document.querySelector(".checkAll");  //全选选中
        var checkoff = document.querySelector(".activeA");  //全选未选中

        const data = JSON.parse(localStorage.getItem("cartGoods")); //总的商品数量

        if(ev.target.className=="active"){  //单个商品点击选中
            ev.target.className="checkBox"
        }else{                              //单个商品点击取消选中
            ev.target.className="active";

            //单个商品点击取消选中时，全选=>未选中状态
            checkon&&checkon.setAttribute("class","activeA")
        }

        //当前选中的商品数量
        var scheckon = document.querySelectorAll(".checkBox");

        if(scheckon.length == data.length){     //当选中商品数量等于总数时，全选=>选中状态
            checkoff&&checkoff.setAttribute("class","checkAll")
        }

    }
    componentDidMount(){
            const data = JSON.parse(localStorage.getItem("cartGoods"));
            this.setState({
                cartData:data
            })
    }
}

export default CartPage;
