import React,{Component} from 'react';
import { NavBar, Icon ,Button} from 'antd-mobile';
import "../../components/reset.css";
import style from "./register.css";

class Register extends Component{
  state = {
    disabled: "disabled",
  };

  render(){
    return(<div id = "w_register">
      <NavBar
      mode="light"
      onLeftClick={() => window.history.go(-1)}
      rightContent={[

        <Icon key="1" type="ellipsis" />,
      ]}
    >注册护照</NavBar>
    <ul>
      <li><input type="text" placeholder="请输入手机号" maxLength="11"/></li>
      <li><input type="text" placeholder="请输入验证码" maxLength="6"/><span>获取验证码</span></li>
      <li><input type="password" placeholder="请设置银泰护照密码"  maxLength="12"/></li>
      <li><input type="password" placeholder="请再次确认银泰护照密码"  maxLength="12"/></li>
    </ul>
    <p>请为护照设置密码（6到12位，英文+数字）</p>
    <p>注册关联银泰护照后您可使用护照直接登录银泰网。银泰护照即银泰百货会员，注册后，在银泰百货商场可享受会员待遇，并可共享积分等。</p>

    <Button className="w_register" disabled={this.state.disabled} onClick={e => console.log(e)}>
          创建银泰护照
        </Button>
    </div>)
  }
}



export default Register
