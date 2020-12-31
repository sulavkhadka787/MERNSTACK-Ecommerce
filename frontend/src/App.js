import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/orderScreen';
import PaymentmethodScreen from './screens/PaymentmethodScreen';
import PlaceOrderScreen from './screens/PlaceorderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddress';
import SigninScreen from './screens/SigninScreen';

function App() {

  const show=()=>{
    console.log('showwww');
    let sidebar=document.getElementById("toggle-bar");
    sidebar.classList.toggle('active');
  }

  const cart=useSelector(state=>state.cartRed);
  const {cartItems}=cart;
  const userSignin=useSelector(state=>state.userSigninRed);
  const {userInfo}=userSignin;

  const dispatch=useDispatch();

  const signoutHandler=()=>{
    dispatch(signout());
  }
  return (
    <BrowserRouter>
      <div>
          <div id="toggle-bar">
            <ul>
                <li><Link to ="/">Women</Link></li>
                <li><Link to ="/">Men</Link></li>
                <li><Link to ="/">Kids</Link></li>
                <li><Link to ="/">Beach</Link></li>
                <li><Link to ="/">Summer</Link></li>
                <li><Link to ="/">Winter</Link></li>
                <li><Link to ="/">Home</Link></li>
                <li><Link to ="/">Shop-Now</Link></li>
                <li>
                {userInfo ? (
                         <Link className="userinfo userinfo-sidebar" to="#">{userInfo.name}</Link> 
                      ):(
                        <Link to ="/signin">Login</Link>
                      )
                    }
               
                </li>
                  <li><Link to ="/">My-Cart
                    {
                          cartItems.length >0 && (
                            <span className="badge">:{cartItems.length}</span>
                          )
                        }
                  </Link></li>
            </ul>
          </div>
          <div className="header-nav">
              <div className="nav-img">
                <button onClick={()=>show()}> &#9776;</button><Link to="/"><strong>S & B</strong><span> - Clothing</span></Link>
              </div>
              <div className="nav-items">
              
                      <Link to ="/">Home</Link>
                      {
                          userInfo && userInfo.isAdmin ? (
                          <div className="dropdown">
                            <Link to="#admin">Admin<i className="fa fa-caret-down"></i></Link>
                            <div className="dropdown-content"> 
                              <Link to="/dashboard">Dashboard</Link>
                              <Link to="/productlist">Products</Link>
                              <Link to="/orderlist">Orders</Link>
                              <Link to="/userlist">Users</Link>
                            </div>

                          </div>
                        ):(
                          <Link to ="/">Shop</Link>
                        )
                      }
                      
                      
                  
                     
                      {userInfo ? (
                        <div className="dropdown">
                          <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i></Link>
                          <div className="dropdown-content">
                            <Link to="/profile">User Profile</Link>
                            <Link to="/orderhistory">Order History</Link>
                            <Link to="/signout" onClick={signoutHandler}>Signout</Link>
                           </div> 
                          
                        </div>

                        ):(
                        <Link to ="/signin">Login</Link>
                      )}
                     
                      
                      
                      <Link to ="/cart/"><img src="/images/cart.png" className="nav-cart-icon" alt="" />
                        {
                          cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                          )
                        }
                       </Link>
              </div>
          </div>
          
              
          <main>
              <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
              <Route path="/order/:id" component={OrderScreen}></Route>
              <Route path="/placeorder" component={PlaceOrderScreen}></Route>
              <Route path="/payment" component={PaymentmethodScreen}></Route>
              <Route path="/shipping" component={ShippingAddressScreen}></Route>
              <Route path="/cart/:id" component={CartScreen}></Route>             
              <Route path="/product/:id" component={ProductScreen} exact></Route>
              <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
              <Route path="/cart" component={CartScreen} exact></Route>
              <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
              <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
              <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute> 
              <Route path="/register" component={RegisterScreen}></Route>
              <Route path="/signin" component={SigninScreen}></Route>
              <Route path="/" component={HomeScreen} exact></Route>
         
          </main>

        <footer>
            &#169;S&B - Clothing
        </footer>
      </div>
    </BrowserRouter>
      
  );
}

export default App;
