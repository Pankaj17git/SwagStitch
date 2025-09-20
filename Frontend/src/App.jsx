import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router'
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
import ProtectedRoutes from './routes/ProtectedRoutes'
import Orders from './pages/Orders'
import OrderDetails from './components/orders/orderdetails/OrderDetails'
import ProtectedUserRoutes from './routes/ProtectedUserRoutes'
import { lazy, Suspense } from 'react'
import AdminSettings from './components/admin/adminSetting/AdminSettings'

// Lazy load Admin pages
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const Dashboard = lazy(() => import("./components/admin/dashboard/Dashboard"));
const Addproduct = lazy(() => import("./components/admin/addProducts/Addproduct"));
const ListProduct = lazy(() => import("./components/admin/listProduct/Listproduct"));
const UserList = lazy(() => import("./components/admin/users/UserList"));
const OrdersList = lazy(() => import("./components/admin/orderlists/OrderList"));




function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Navbar />
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
            <Route path='product' element={<Product />}>
              <Route path=':productId' element={<Product />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/orders/orderdetails' element={<OrderDetails />} />
            <Route path='/checkout' element={<ProtectedUserRoutes><Checkout /></ProtectedUserRoutes>} />
            <Route path='/payment' element={<ProtectedUserRoutes><Payment /></ProtectedUserRoutes>} />
            <Route path='/login' element={<LoginSignUp />} />

            {/* Admin Routes */}

            <Route path='/admin' element={<ProtectedRoutes><AdminLayout /></ProtectedRoutes>}>
              <Route index element={<Dashboard />} />
              <Route path='addproduct' element={<Addproduct />} />
              <Route path='productlist' element={<ListProduct />} />
              <Route path='userlist' element={<UserList />} />
              <Route path='orderlist' element={<OrdersList />} />
              <Route path='settings' element={<AdminSettings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
