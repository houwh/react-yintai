import React,{Component}from "react";
import { NavBar, Icon} from 'antd-mobile';

import "../../components/reset.css"
import My from "./my.css";

class MyPage extends Component {
  render () {
    return (<div id = "w_my" className={My.mine} >
      <NavBar
        mode="light"
        onLeftClick={() => window.history.go(-1)}
        rightContent={[
          <Icon key="1" type="ellipsis" />,
        ]}
      >我的银泰</NavBar>
      <div className="w_div">
          <img src="https://h5.yintai.com/m/images/user-head-72656860b5.png" alt=""/>
          <p>用户名</p>
          <span>普卡会员</span>
      </div>
  <ul className="w_ul1">
      <li>
          <span><img src="https://h5.yintai.com/m/images/index/user-order-6554dcaada.png" alt=""/></span>
          <p>全部订单</p>
      </li>
      <li>
          <span><img src="https://h5.yintai.com/m/images/index/user-pay-f87d302e5e.png" alt=""/></span>
          <p>待付款</p>
      </li>
      <li>
          <span><img src="https://h5.yintai.com/m/images/index/user-shouhuo-cd53963af4.png" alt=""/></span>
          <p>待收货</p>
      </li>
      <li>
          <span><img src="https://h5.yintai.com/m/images/index/user-return-7b44cdea8c.png" alt=""/></span>
          <p>退换货</p>
      </li>
  </ul>
  <ul className="w_ul2">
      <li><span>0</span><p>积分</p></li>
      <li><span>0.00</span><p>银元</p></li>
      <li><span>0.00</span><p>余额</p></li>
  </ul>
  <ul className="w_ul3">
      <li><div><img src="https://h5.yintai.com/m/images/index/user-center-img-3-47c1a8ce6f.png" alt=""/></div><div><span>银泰卡</span><p>已登记0张</p></div></li>
      <li><div><img src="https://h5.yintai.com/m/images/index/user-center-img-1-b45a9b7992.png" alt=""/></div><div><span>优惠券</span><p>0张有效</p></div></li>
      <li><div><img src="https://h5.yintai.com/m/images/index/user-center-img-2-700ce37aff.png" alt=""/></div><div><span>银泰护照</span><p>131****0088</p></div></li>
      <li><div><img src="https://h5.yintai.com/m/images/index/user-center-img-4-432d596d3b.png" alt=""/></div><div><span>手机号</span><p>131****0088</p></div></li>
  </ul>
  <ul className="w_ul4">
      <li><span></span><p>收藏</p></li>
      <li><span></span><p>浏览记录</p></li>
      <li><span></span><p>支付密码</p></li>
      <li><span></span><p>收货地址</p></li>
  </ul>
  <ul className="w_ul5">
      <li><p>帮助中心</p><span>＞</span></li>
      <li><p>客服电话</p><span><i><b>400-119-1111</b>（8:00-24:00）</i>＞</span></li>
  </ul>
  <ul className="w_ul6">
      <li><p>下载银泰客户端</p><span>＞</span></li>
  </ul>
  <button className="w_ul7">退出账号</button>
    </div>)
  }
}


export default MyPage;
