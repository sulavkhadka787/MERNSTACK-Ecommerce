import {applyMiddleware, createStore,compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers';
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './reducers/productReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer} from './reducers/userReducers';

const initialState={
    userSigninRed:{
        userInfo:localStorage.getItem('userInfo')
                ? JSON.parse(localStorage.getItem('userInfo'))
                :null
    },
    cartRed:{
        cartItems:localStorage.getItem('cartItems') 
                  ? JSON.parse(localStorage.getItem('cartItems'))
                  :[],
        shippingAddress:localStorage.getItem('shippingAddress')
                        ? JSON.parse(localStorage.getItem('shippingAddress'))
                        :{},
        paymentMethod:'PayPal'
    }
};

const reducer=combineReducers({
    productListRed:productListReducer,
    productDetailsRed:productDetailsReducer,
    cartRed:cartReducer,
    userSigninRed:userSigninReducer,
    userRegisterRed:userRegisterReducer,
    orderCreateRed:orderCreateReducer,
    orderDetailsRed:orderDetailsReducer,
    orderPayRed:orderPayReducer,
    orderMineListRed:orderMineListReducer,
    userDetailsRed:userDetailsReducer,
    userUpdateProfileRed:userUpdateProfileReducer,
    productCreateRed:productCreateReducer,
    productUpdateRed:productUpdateReducer,
    productDeleteRed:productDeleteReducer,
    orderListRed:orderListReducer,
    orderDeleteRed:orderDeleteReducer,
    orderDeliverRed:orderDeliverReducer
})

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;