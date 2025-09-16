import Navbar from './components/navbar/Navbar'
import {BrowserRouter, Route, Routes} from 'react-router'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginSignUp from './pages/LoginSignUp'
import ShopCategory from './pages/ShopCategory'
import Footer from './components/footer/Footer'
import men_banner from './components/Assets/banner_mens.png'
import kid_banner from './components/Assets/banner_kids.png'
import women_banner from './components/Assets/banner_women.png'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import AdminLayout from './layout/AdminLayout'
import ListProduct from './components/admin/listProduct/Listproduct'
import Addproduct from './components/admin/addProducts/Addproduct'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Orders from './pages/Orders'
import UserList from './components/admin/users/UserList'
import Dashboard from './components/admin/dashboard/Dashboard'
import OrdersList from './components/admin/orderlists/OrderList'
import OrderDetails from './components/orders/orderdetails/OrderDetails'



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/mens' element={<ShopCategory banner={men_banner} category= "men"/>}/>
          <Route path='/womens' element={<ShopCategory banner={women_banner} category= "women"/>}/>
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category= "kid"/>}/>
          <Route path='product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/orders/orderdetails' element={<OrderDetails/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/login' element={<LoginSignUp/>}/>

          {/* Admin Routes */}

          <Route path='/admin' element={<ProtectedRoutes><AdminLayout/></ProtectedRoutes>}>
            <Route index element={<Dashboard/>}/>
            <Route path='addproduct' element={<Addproduct/>}/>
            <Route path='productlist' element={<ListProduct/>}/>
            <Route path='userlist' element={<UserList/>}/>
            <Route path='orderlist' element={<OrdersList/>}/>
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
