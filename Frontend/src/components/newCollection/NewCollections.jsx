import React, { useEffect, useState } from 'react'
import './NewCollection.css';
import Item from '../items/Item';
import axios from 'axios'

const NewCollections = () => {
  const [new_collections, setNew_collection] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}products/newcollections`);
        setNew_collection(res.data);
      } catch (error) {
        console.error("Error fetching new collections:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="new-collections">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
          {
            new_collections.map((item, i) => {
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })
          }  
        </div>
      </div>
    </>
  )
}

export default NewCollections;
