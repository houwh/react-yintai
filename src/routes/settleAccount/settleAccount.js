/**
 * Created by Administrator on 2017/6/12.
 */
import React,{Component} from "react";
import {NavBar,List,WhiteSpace,InputItem,Modal} from "antd-mobile";
import Style from "./settleAccount.css";

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

class SettleAccount extends Component{
    render(){
        var data = JSON.parse(localStorage.getItem("cartGoods"));
        console.log(data);
        var money = 0;
        data.map((ele)=>{
            money+=ele.msg.ytprice*ele.num
        });
        return <div className={Style.payPage}>
            <NavBar
                    mode="light"
                    onLeftClick={() => window.location.hash = "/cart"}
            >结算中心</NavBar>

            <InputItem  className={Style.adress}
                        disabled = "false"
                        extra = ">"
                        onExtraClick = {()=>{console.log("填写地址")}}
                        placeholder="地址"
            >收货人地址</InputItem>
            <WhiteSpace />
            <InputItem  className={Style.pay}
                disabled = "false"
                extra = ">"
                onExtraClick = {()=>{console.log("支付方式")}}
                placeholder="支付宝支付"
            >支付方式</InputItem>
            <WhiteSpace />
            <List>
                <InputItem  className={Style.msg}
                    disabled = "false"
                    extra = ">"
                    onExtraClick = {()=>{console.log("填写发票信息")}}
                    placeholder="请填写发票信息"
                >索要发票</InputItem>
                <InputItem  className={Style.msg}
                    disabled = "false"
                    extra = ">"
                    onExtraClick = {()=>{console.log("查看优惠券")}}
                    placeholder="当前订单0张可用"
                >使用优惠券</InputItem>
            </List>
            <WhiteSpace />
            <List className="my-list">
                <Item extra={'共'+data.length+'件商品'}>商品清单</Item>
                {
                    data.map((ele)=>{
                        return <Item className={Style.goodsmsg}
                            thumb={ele.msg.middleimgurls[0]}
                            multipleLine
                            platform="android"
                            onClick={() => {}}
                        >
                                {ele.msg.name} <Brief>￥{ele.msg.ytprice}.00</Brief>
                        </Item>
                    })
                }
            </List>
            <WhiteSpace />
            <List className="my-list">
                <Item extra={data.length+'件'}>商品数量总计：</Item>
                <Item extra={"￥"+money+".00"}>商品总金额：</Item>
                <Item extra="￥0.00(订单已满199元，免运费)">运费：</Item>
                <Item extra={"￥"+money+".00"}>订单金额：</Item>
                <Item extra={Math.floor(money/3)}>获得积分：</Item>
            </List>
            <WhiteSpace />
            <List>
                <Item className={Style.submit}
                    onClick={() => {}}
                    extra = {<button className={Style.button}
                onClick={() => alert('确认订单', '请确认订单是否正确！', [
                { text: '取消'},
                { text: '确定', onPress: () => window.location.hash = "#/", style: { fontWeight: 'bold' } }
                 ])}
                    >提交订单</button>}
                >您需支付 <span>￥{money}</span></Item>
            </List>
        </div>
    }
}

/*thumb  缩略图
extra 右边内容
arrow 箭头方向
brief 副标题*/
export default SettleAccount;