import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    getProducts()
  },[])

  async function getProducts() {
    let { data: products, error } = await supabase
      .from('products')
      .select('*')
    setProducts(products);
  }

  console.log(products)

  return (
    <>
      <h2>Supabase</h2>
      <ul>
        {products.map((product)=>(
          <li key={product.id}>
            {product.name} -- {product.age}
          </li>
        ))
        }
      </ul>
    </>
  )
}

export default App
