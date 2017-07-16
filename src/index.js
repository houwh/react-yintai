import React from 'react';
import ReactDOM from 'react-dom';
import store from "./config/store";
import {Provider} from "react-redux";
import {Router,Route,hashHistory,IndexRoute} from "react-router";

import Home from "./routes/home/home";                              /*首页*/
import NewAC from "./routes/new/navBar";                            /*抢先*/
import Public from "./components/publicMenu/public";                /*底部切换 */
/*import ListPage from "./routes/listPractice/list";  */            /*我的列表(练习)*/
import CartPage from "./routes/cart/cart";                          /*购物车*/
import SettleAccount from "./routes/settleAccount/settleAccount";   /*结算中心*/

import Classes from "./routes/classes/classification";              /*分类*/
import ClassList from "./routes/classes/list";                      /*分类列表*/
import DetailPage from "./routes/detail/details";                   /*详情*/

import MinePage from "./routes/mine/my";                            /*我的*/
import LoginPage from "./routes/login/login";                       /*登录*/
import ReginsterPage from "./routes/register/register";             /*注册*/
import activePage from "./routes/activePage/huodongList";           /*活动页*/
import actDetPage from "./routes/activeDetail/classdetail";

const APP = ()=><Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={Public}>
            <IndexRoute component={Home}/>
            <Route path="new" component={NewAC}/>
            <Route path="class" component={Classes}/>
            <Route path="cart" component={CartPage}/>
            <Route path="mine" component={MinePage}/>
            <Route path="account" component={SettleAccount}/>
            <Route path="mine" component={MinePage}/>
            <Route path="active" component={activePage} />
        </Route>
        <Route path="/list(/:goodsID)" component={ClassList} />
        <Route path="/details(/:goodsID)" component={DetailPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={ReginsterPage} />
        <Route path="/classdetail" component={actDetPage} />
    </Router>
</Provider>;

ReactDOM.render(<APP/>, document.getElementById('root'));

