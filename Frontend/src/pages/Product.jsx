import React from 'react'
import { useShopContext } from '../context/ShopContext'
import { useParams } from 'react-router';
import Breadcrum from '../components/breadcrum/Breadcrum';
import Productdisplay from '../components/productdisplay/Productdisplay';
import DescriptionBox from '../components/descriptionbox/DescriptionBox';
import RelatedProducts from '../components/relatedproducts/RelatedProducts';


const Product = () => {
  const { all_product } = useShopContext();
  const { productId } = useParams();
  // // Wait for products to load
  if (!all_product || all_product.length === 0) {
    return <div>Loading product...</div>;
  }
  const product = all_product.find((e) => e.id === Number(productId));
  if (!product) {
    return <div>Product not found.</div>;
  }
  return (
    <>
      <div>
        <Breadcrum product={product} />
        <Productdisplay product={product} />
        <DescriptionBox />
        <RelatedProducts />
      </div>
    </>
  );
}

export default Product
