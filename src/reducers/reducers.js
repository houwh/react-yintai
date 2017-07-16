/**
 * Created by Administrator on 2017/6/13.
 */
const NavReducer = function (state={tabTxt:[],getTabList:[],getTabList3:[]},action) {
    switch(action.type){
        case "getTabTxt":
            var newState = Object.assign({},state,{tabTxt:action.msg});
            return newState;
            break;
        case "getTabList":
            var newState = Object.assign({},state,{getTabList:action.msg});
            return newState;
            break;
        case "getTabList3":
            var newState = Object.assign({},state,{getTabList3:action.msg});
            return newState;
            break;
        default:return state;
    }

};

const HomeReducer = (state={carouselData:[],cartData:[]},action)=>{
    switch(action.type){
        case "carouselData":
            var newState = Object.assign({},state,{carouselData:action.msg});
            const data = JSON.parse(JSON.stringify(newState));
            return data;
            break;
        case "cartData":
            return Object.assign({},state,action.msg);
        default:return state;
    }
};


const ListReducer = (state={getInitialData:[],listData:[],filter:[]},action)=>{
    switch(action.type){
        case "getInitialData":
            return Object.assign({},state,{getInitialData:action.msg});
        case "getMoreData":
            return Object.assign({},state,{getInitialData:state.getInitialData.concat(action.msg)});
        /*分类列表*/
        case "getCartDataAction":
            return Object.assign({},state,{listData:action.listData});
        case "getCartDatafilter":
            return Object.assign({},state,{filter:action.filter});
        case "getProductListDataMore":
            return Object.assign({},state,{
                listData:state.listData.concat(action.listData)
            });
        default:return state;
    }
};

const DetailsData = function(state={details:[]},action){
    switch (action.type){
        case "getDetailsAction":
            return Object.assign({},state,{details:action.details})
        default:
            return state
    }
};

const CartData = function(state={cartData:[]},action){
    switch (action.type){
        case "getCartData":
            return Object.assign({},state,action.msg);
        case "delCartData":
            return Object.assign({},state,action.msg);
        default:
            return state;
    }
};

export {
    NavReducer,
    HomeReducer,
    ListReducer,
    DetailsData,
    CartData
};