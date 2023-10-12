
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Routes, useNavigate } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
//------- auth ---------//
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import AppNav from '../components/AppNav';
import CheckoutScreen from '../screens/CheckoutScreen';
//-------- admin ----------//
import OrderManage from '../screens/admin/OrderManage';
import UpdateProduct from '../screens/admin/UpdateProduct';
import AddProduct from '../screens/admin/AddProduct';
import ProductManage from '../screens/admin/ProductManage';
import BlogsScreen from '../screens/BlogsScreen';
import BlogScreen from '../screens/BlogScreen';
import AddBlog from '../screens/admin/AddBlog';

const AppNavigation = () => {

  let token = localStorage.getItem('token');
  let isAdmin = localStorage.getItem('isAdmin');

  const [currentUser, setCurrentUser] = useState(
    isAdmin === null ? 'PUBLIC_USER' : isAdmin
  );
  useEffect(() => {
    setCurrentUser(isAdmin);
  }, [isAdmin]);

  const PublicElement = ({ children }) => {
    return (
      <>
        {children}
      </>
    )
  }
  const UserElement = ({ children }) => {
    if (currentUser === 'NORMAL_USER') {
      return <>{children}</>
    } else {
      return <div className="d-flex justify-content-center align-item-center ">
        <div className="mt-5 pt-5">
          <div>
          </div>
          <h2 style={{ color: '#10273d' }}>
            You do not access to this page!
          </h2>
        </div>
      </div>
    }
  }

  const AdminElement = ({ children }) => {
    if (currentUser === 'ADMIN_USER') {
      return <>{children}</>
    } else {
      return <div className="d-flex justify-content-center align-item-center ">
        <div className="mt-5 pt-5">
          <div>
            <h2 style={{ color: '#10273d' }}>
              You do not access to this page!
            </h2>
          </div>
        </div>
      </div>
    }
  }

  return (
    <Router>
      <AppNav />
      <Routes>
        {/* Public user */}
        <Route path='/' element={<PublicElement><HomeScreen /></PublicElement>} />
        <Route path='/about' element={<PublicElement><AboutScreen /></PublicElement>} />
        <Route path='/blogs' element={<PublicElement><BlogsScreen /></PublicElement>} />
        <Route path='/blog/:id' element={<PublicElement><BlogScreen /></PublicElement>} />
        <Route path='/login' element={<PublicElement><LoginScreen /></PublicElement>} />
        <Route path='/signup' element={<PublicElement><SignupScreen /></PublicElement>} />
        <Route path='/product/:id' element={<PublicElement><ProductScreen /></PublicElement>} />
        {/* Normal user  */}
        <Route path='/carts/:id' element={<UserElement><CartScreen /></UserElement>} />
        <Route path='/checkout/:id' element={<UserElement><CheckoutScreen /></UserElement>} />
        {/* order  */}
        {/* Admin User  */}
        <Route path='/order-management' element={<AdminElement><OrderManage /></AdminElement>} />
        <Route path='/updateProduct/:id' element={<AdminElement><UpdateProduct /></AdminElement>} />
        <Route path='/productmanagement' element={<AdminElement><ProductManage /></AdminElement>} />
        <Route path='/addProduct' element={<AdminElement><AddProduct /></AdminElement>} />
        <Route path='/addBlog' element={<AdminElement><AddBlog /></AdminElement>} />
      </Routes>
    </Router>
  )
}

export default AppNavigation