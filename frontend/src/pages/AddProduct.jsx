import React, { useState } from 'react';
import axios from 'axios';
import './Add.css'

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    size: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/add', formData);
      alert('✅ สินค้าเพิ่มเรียบร้อยแล้ว!');
      setFormData({ name: '', brand: '', category: '', size: '', price: '', description: '' });
    } catch (error) {
      console.error('❌ เพิ่มสินค้าไม่สำเร็จ:', error);
      alert('❌ เพิ่มสินค้าไม่สำเร็จ!');
    }
  };

  return (
    <div className='container'>
      <h2>เพิ่มสินค้าใหม่</h2>
      <form onSubmit={handleSubmit}>
        <label>ชื่อสินค้า:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <br />
        <label>แบรนด์:</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
        <br />
        <label>หมวดหมู่:</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} />
        <br />
        <label>ขนาด:</label>
        <input type="text" name="size" value={formData.size} onChange={handleChange} required />
        <br />
        <label>ราคา:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        <br />
        <label>คำอธิบาย:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
        
        <br />
        <button type="submit">เพิ่มสินค้า</button>
      </form>
    </div>
  );
}

export default AddProduct;
