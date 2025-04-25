// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css'; // สไตล์ CSS สำหรับ ProductList

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products') // สมมุติ endpoint คือ /api/products
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (

    <body className='background'>
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src="https://tse1.mm.bing.net/th/id/OIP.CvU2CQ4M3F_u1_1PTvwyVQHaJQ?rs=1&pid=ImgDetMain" alt={product.name} className="product-image" />
            <h2 className='tital'>{product.name}</h2>
            <p className="change_inline"><strong>Size:</strong> {product.size}</p>
            <p  className="change_inline"><strong>Price:</strong> ${product.price}</p><br></br>
            <button className="add-to-cart">Add to Cart</button>
            <h className='hidden'></h>
            <button className="buy-now">Buy Now</button>
          </div>
        ))}
      </div>
    </body>
  );
}

export default ProductList;
