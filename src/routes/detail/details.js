/**
 * Created by Administrator on 2017/6/16.
 */
import React from "react";
import {Carousel,Toast ,Stepper,List} from 'antd-mobile';
import {Header,Content,Shop} from "../../components/common/common";
import {connect} from "react-redux";
import Det from "./details.css";

class Details extends React.Component {
    onChange1 = (val1) => {
        // console.log(val);
        this.setState({ val1 });
    };
    detailsColor(id,title){
        this.setState({
            color:id,
            title:title
        })
    }
    state = {
        data: ['', '', ''],
        initialHeight: 500,
        Carousel:[],
        color:4,
        title:this.props.details[4]&&this.props.details[4].skuproperty[0].name,
        size:4,
        val: 3,
        val1: 2,
    };
    render() {
        const {details} = this.props;
        const {color} = this.state;
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        return (
            <div className={Det.detail}>
                <Header title="商品详情"/>
                    <Carousel
                        className="my-carousel"
                        autoplay={false}
                        infinite
                        selectedIndex={1}
                        swipeSpeed={35}
                    >
                        {details[color]&&details[color].superlargeimgurls.map(ii => (
                                <img
                                    src={ii}
                                    alt="icon"
                                    onLoad={() => {
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({
                                            initialHeight: null,
                                        });
                                    }}
                                />
                        ))}
                    </Carousel>
                <Shop addCart={this.addCart.bind(this)}/>
                <Content>
                    {/*价钱*/}
                    <div className="details-price">
                        <p className="details-price-name">{details[color]&&details[color].name}</p>
                        <ul className="details-price-mark">
                            <li><span>¥</span>{details[color]&&details[color].ytprice}.00</li>
                            <li><s>¥{details[color]&&details[color].marketprice}.00</s></li>
                            <li>商品编号:{details[color]&&details[color].imageitemcode}</li>
                        </ul>
                    </div>
                    <div className="details-rotating">
                        {/*已选*/}
                        <p className="details-yx">已选:"{this.state.title}""{this.state.val1}"</p>
                        {/*颜色*/}
                        <div className="details-colour">
                            <p>颜色：</p>
                            <p className="details-colour-span">
                                <span className={color==1?"details-active":""} onClick={()=>this.detailsColor(1,details[1]&&details[1].skuproperty[0].value)}>
                                    {details[1]&&details[1].skuproperty[0].value}
                                </span>
                                <span className={color==4?"details-active":""} onClick={()=>this.detailsColor(4,details[4]&&details[4].skuproperty[0].value)}>
                                    {details[4]&&details[4].skuproperty[0].value}
                                </span>
                            </p>
                        </div>
                        {/*尺寸*/}
                        <div className="details-size">
                            <p>尺寸：</p>
                            <p className="details-size-span">
                                <span>{details[0]&&details[0].skuproperty[1].value}</span>
                                <span>{details[5]&&details[5].skuproperty[1].value}</span>
                                <span>{details[2]&&details[2].skuproperty[1].value}</span>
                                <span>{details[3]&&details[3].skuproperty[1].value}</span>
                            </p>
                        </div>
                        {/*数量*/}
                        <div className="details-number">
                            <p>数量：</p>
                            <List.Item extra={<div>
                                <Stepper
                                    style={{ width: '20%', minWidth: '2rem' }}
                                    showNumber
                                    max={10}
                                    min={1}
                                    value={this.state.val1}
                                    onChange={this.onChange1}
                                    useTouch={false}
                                />
                              {/*  <span className="stepper-ku">库存紧张，仅剩2件</span>*/}
                             </div>} >
                            </List.Item>
                        </div>
                    </div>
                </Content>
            </div>
        );
    }
    addCart(){
        const good = {  "msg":this.props.details[this.state.color],
                        "num":this.state.val1,
                        "color":this.state.title,
                        "id":this.props.details[this.state.color].itemcode  };

        const cartMsg = localStorage.getItem("cartGoods");
        if(!cartMsg){
            /*第一次添加购物车*/
            localStorage.setItem("cartGoods",JSON.stringify([good]));
        }else{
            const cartMsgNew = JSON.parse(cartMsg);
            var hasSameGoods = false;
            /*判断是否有相同商品*/
            for(var i = 0; i <cartMsgNew.length; i++){
                if(good.id == cartMsgNew[i].id){
                    cartMsgNew[i].num += good.num;
                    hasSameGoods = true;
                    break;
                }
            }
            /*没有相同商品*/
            if(!hasSameGoods){
                cartMsgNew.push(good);
            }
            localStorage.setItem("cartGoods",JSON.stringify(cartMsgNew));
        }
    }
    componentDidMount(){
        console.log(this.props.params.goodsID)
        this.props.dispatch(getProductData(this.props.params.goodsID))
    }
}

const getProductData = (id)=>{
    Toast.loading("加载中...");
    return function(dispatch){
        fetch(`/ashx/?data=%7B%22itemcode%22%3A%22${id}%22%2C%22userid%22%3A%22%22%7D&userid=&methodName=products.getproductdetail_1.0.0&method=products.getproductdetail&ver=1.0.0&r=201706161001`)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                Toast.hide();
                dispatch({type:"getDetailsAction",details:data.data.products})
            })
    }
};

export default connect(state=>{
    return {
        details:state.DetailsData.details
    }
})(Details)


