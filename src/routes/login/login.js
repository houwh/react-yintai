import React,{Component}from "react";
import { NavBar, Icon,Tabs,Button, List, InputItem} from 'antd-mobile';
import {Link} from "react-router";
import { createForm } from 'rc-form';
import "../../components/reset.css";
import style from "./login.css";


class BasicInputExample extends React.Component {
  props={
     placeh:''
  };
  state = {
    focused: false,
    focused1: false,

  };
  render() {
    const { getFieldProps } = this.props.form;
    return  <List>
        <InputItem
          placeholder={this.props.placeh}
          focused={this.props.focused1}
          onFocus={() => {
            this.setState({
              focused1: false,
            });
          }}
        ><div onClick={() => this.setState({ focused1: true })}>账号</div></InputItem>
        <InputItem
          {...getFieldProps('password')}
          type="password"
          placeholder="请输入密码"
          focused={this.state.focused1}
          onFocus={() => {
            this.setState({
              focused1: false,
            });
          }}
          ><div onClick={() => this.setState({ focused1: true })}>密码</div></InputItem>

        </List>
  }
}

const BasicInputExampleWrapper = createForm()(BasicInputExample);

const TabPane = Tabs.TabPane;

class Login extends Component {
  state = {
      focused: false,
      focused1: false,
    };
render(){

  return(
    <div className={style.login} id="login">
      <NavBar
       mode="light"
       onLeftClick={() => window.history.go(-1)}
       rightContent={[

         <Icon key="1" type="ellipsis" />,
       ]}>登录
      </NavBar>
          <Tabs defaultActiveKey="1" >
         <TabPane tab="银泰护照" key="1">
          <div className="w_bigkuai">
         <BasicInputExampleWrapper className="w_input" placeh={"请输入银泰护照号"} />

       <Button className="w_btn" type="primary">登录</Button>
       <div className="w_loginBq">
         <p>忘记密码？</p>
         <span><Link to="/register" >注册</Link></span>
       </div>
       <h4>银泰护照即银泰门店会员账号，一般为手机号，如未设置过密码或忘记密码可点击“忘记密码”进行找回。</h4>
       <h4><b>推荐您使用银泰护照进行登录。</b>使用银泰护照登录，将可在线享受银泰会员的一些权益，并与您线上账号进行关联，确保您的会员权益最大化。</h4>
       </div>
       <h5>客服电话：<span>400-119-1111</span>（8:00-24:00）</h5>
     </TabPane>
     <TabPane tab="银泰网账号" key="2">
       <div className="w_bigkuai">
       <BasicInputExampleWrapper className="w_input" placeh={"请输入手机/邮箱"} />
       <Button  className="w_btn" type="primary">登录</Button>
       <div className="w_loginBq">
         <p>忘记密码？</p>
         <span><Link to="/register" >注册</Link></span>
       </div>
        </div>
       <h5>客服电话：<span>400-119-1111</span>（8:00-24:00）</h5>
     </TabPane>
   </Tabs>


  </div>
  )
}
}

export default Login
