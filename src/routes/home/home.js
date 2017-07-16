import React,{Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {Icon,Carousel,Grid,Toast} from "antd-mobile";
import Style from "./home.css";

/*首页头部*/
class Header extends Component {
    render(){
        return <div className={Style.header}>
            <img src={require("../../img/newlogo.png")} alt=""/>
            <div className={Style.search}>
                <input placeholder="搜索商品or品牌" type="text"/>
                <span className={Style.searchBox}><Icon className={Style.oSearch} type={require("../../svg/title-bar/search.svg")}/></span>
            </div>
            <div className={Style.user} onClick={()=>window.location.hash ="#/login"}><Icon className={Style.oUser} type={require("../../svg/title-bar/user.svg")}/></div>
        </div>
    }
}

/*爆款专区*/
class Hot extends Component{
    state={
        hotData:[]
    };
    render(){
        return <div className={Style.hotzone}>
            <ul>
                {
                   this.state.hotData.map((ele,index)=>{
                       return   <Link to={`/details/${ele.itemid}`}>
                       <li key={index}>
                           <img src={ele.imgurl} alt=""/>
                           <p>{ele.extra.productdetail.name}</p>
                           <span>￥{ele.extra.productdetail.price}</span>
                       </li>
                       </Link>
                   })
                }
            </ul>
        </div>
    }
    componentDidMount(){
        fetch("/ashx?r=201706132108&os=HTML5&client_v=1.0.0&pageid=104001&previewtime=0&methodName=products.template.getpage_1.0.0&method=products.template.getpage&apptype=10&ver=1.0.0&pageindex=1")
            .then(res=>res.json()).then(data=>{
                //console.log(data.data.templatelist[3].items)
            this.setState({
                hotData:data.data.templatelist[3].items
            })
        })
    }
}

/*本周推荐*/
class Recmand extends Component{
    state={
        dataS:[],
        dataX:[],
        dataD:[]
    };
    render(){
        return <div className={Style.rec}>
            <ul>
                {
                    this.state.dataS.map((ele,index)=>{
                        return <li key={index}>
                            <img src={ele.imgurl} alt=""/>
                        </li>
                    })
                }
            </ul>
            <ul>
                {
                    this.state.dataX.map((ele,index)=>{
                        return <li key={index}>
                            <img src={ele.imgurl} alt=""/>
                        </li>
                    })
                }
            </ul>
            <div>
                <img src={this.state.dataD.imgurl} alt=""/>
            </div>
        </div>
    }
    componentDidMount(){
        fetch("/ashx?r=201706132108&os=HTML5&client_v=1.0.0&pageid=104001&previewtime=0&methodName=products.template.getpage_1.0.0&method=products.template.getpage&apptype=10&ver=1.0.0&pageindex=1")
            .then(res=>res.json()).then(data=>{
            //console.log(data.data.templatelist[3].items)
            this.setState({
                dataS:data.data.templatelist[6].items,
                dataX:data.data.templatelist[7].items,
                dataD:data.data.templatelist[8].items[0]
            })
        })
    }
}

/*首页列表专区-精选好货*/
class GoodsList extends Component{
    constructor(props){
        super(props);
        this.state={
            listData:[],
            cartData:[]
        };
    }
    addCart(data){
        this.setState({
            cartData:this.state.cartData.concat(data).reverse()
        });
        this.props.dispatch({type:"cartData",msg:{cartData:this.state.cartData}})

    }
    render(){
        const {listData} = this.state;
        return <div className={Style.listdata}>
            <img className={Style.listTitle} src={require("../../img/33.jpg")} alt=""/>
            <ul>
                {
                    listData.map((ele,index)=>{
                        if(index>=20){
                            return ele.items.map((dom,n)=>{
                                return <Link to={`/details/${dom.itemid}`}>
                                <li onClick={()=>this.addCart(dom)}>
                                    <img src={dom.imgurl} alt=""/>
                                    <p>{dom.extra.productdetail.name}</p>
                                    <p className={Style.price}><span>￥{dom.extra.productdetail.marketprice}.00</span>￥{dom.extra.productdetail.price}.00</p>
                                </li>
                                </Link>
                            })
                        }
                    })
                }
            </ul>
        </div>
    }
    componentDidMount(){
        Toast.loading('加载中...', 1);
        fetch("/ashx?r=20170614940&os=HTML5&client_v=1.0.0&pageid=104001&previewtime=0&methodName=products.template.getpage_1.0.0&method=products.template.getpage&apptype=10&ver=1.0.0&pageindex=2")
            .then(res=>res.json()).then(data=>{
             //console.log(data.data.templatelist);
            this.setState({
                listData:data.data.templatelist
            })
        })
    }
}

/*轮播图下图标数据*/
const oImg = [{src:require("../../img/1.png"),name:"商场同款"},
                {src:require("../../img/2.png"),name:"奢品"},
                {src:require("../../img/3.png"),name:"断码折扣"},
                {src:require("../../img/4.png"),name:"会员专区"},
                {src:require("../../img/5.png"),name:"惠生活"}];
const data = oImg.map((ele,index) =>{
   // console.log(ele.src)
    return ({
        icon: ele.src,
        text: ele.name
    })
});

/*页面渲染*/
class HomePage extends Component{
    render(){
        const {carouselData,initialHeight} = this.props;
        const hProp = initialHeight ? { height: initialHeight } : {};  /*轮播图区域初始高度*/
        return <div>
            {/*引入头部组件*/}
            <Header/>
            {/*轮播图区域*/}
            <Carousel
                className={Style["my-carousel"]}
                autoplay={false}
                infinite
                selectedIndex={1}
                swipeSpeed={35}
            >
                {carouselData.map((ele,ii)=> (
                    <a href="#/active" key={ii} style={hProp}>
                        <img
                            src={ele.imgurl}
                            alt="icon"
                            onLoad={() => {
                                window.dispatchEvent(new Event('resize'));
                                this.setState({
                                    initialHeight: null,
                                });
                            }}
                        />
                    </a>
                ))}
            </Carousel>
            {/*轮播图下方九宫格【data上】*/}
            <Grid data={data} columnNum={5} hasLine={false} />
            {/*爆款热区*/}
            <img className={Style.listTitle} src={require("../../img/11.png")} alt=""/>
            <Hot/>
            {/*本周推荐*/}
            <img className={Style.listTitle} src={require("../../img/22.png")} alt=""/>
            <Recmand/>
            {/*精选列表*/}
            <GoodsList {...this.props}/>
        </div>
    }
    componentDidMount() {
        Toast.loading('加载中...', 1);
        this.props.getCarousel()
    }
}
function mapStateToProps(state){
    return {
        carouselData:state.HomeReducer.carouselData,
        initialHeight:305*window.devicePicelRation/2
    }
}
function mapDispatchToProps(dispatch){
    return {
        getCarousel(){
            /*获取轮播图片数据*/
            fetch("/ashx?r=201706131958&os=HTML5&client_v=1.0.0&pageid=104001&previewtime=0&methodName=products.template.getpage_1.0.0&method=products.template.getpage&apptype=10&ver=1.0.0&pageindex=1")
                .then(res=>res.json()).then(data=>{
                dispatch({type:"carouselData",msg:data.data.bannerlist})
            })
        },
        dispatch:dispatch
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomePage)


