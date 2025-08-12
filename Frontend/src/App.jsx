import Navbar from './components/navbar/Navbar'
import {BrowserRouter, Route, Routes} from 'react-router'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginSignUp from './pages/LoginSignUp'
import ShopCategory from './pages/ShopCategory'
import Footer from './components/footer/Footer'



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/mens' element={<ShopCategory category= "men"/>}/>
          <Route path='/womens' element={<ShopCategory category= "women"/>}/>
          <Route path='/kids' element={<ShopCategory category= "kid"/>}/>
          <Route path='product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignUp/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
