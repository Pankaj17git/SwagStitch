import React, { useEffect, useState } from 'react'
import './Popular.css'
import axios from 'axios'
import Item from '../items/Item'

const Popular = () => {
  
  const [popularProducts, setPopularProducts] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}products/popularinwomen`)
        setPopularProducts(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
          {
            popularProducts.map((item, i) => {
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default Popular