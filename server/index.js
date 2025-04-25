require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors()); 

app.use(express.json());

const db= mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME

}).promise();

app.get('/api/products' ,async (req,res) =>{
  try
  {
  const [row] = await db.query('SELECT * FROM shoes_shop');
  res.status(200).json(row);
  } catch(err){
    res.status(500).json({message:'error fach',error:err});
  }
});

// เพิ่มสินค้า
app.post('/api/add', async (req, res) => {
  try {
    const { name, brand, category, size, price, description } = req.body;

    if (!name || !category || !size || !price) {
      return res.status(400).json({ message: 'Please enter all required fields (name, category, size, price)' });
    }

    const [result] = await db.query(
      'INSERT INTO shoes_shop (name, brand, category, size, price, description) VALUES (?, ?, ?, ?, ?, ?)',
      [name, brand, category, size, price, description]
    );

    res.status(201).json({ message: 'Product added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
});

// ดึงสินค้าโดย ID
app.get('/api/product/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const [rows] = await db.query(
      'SELECT * FROM shoes_shop WHERE LOWER(name) = LOWER(?)', [name]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(rows);  // คืนค่าทั้งหมดของสินค้าที่ตรงกับชื่อ
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
});


// อัปเดตสินค้า
app.put('/api/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, category, size, price, description } = req.body;

    if (!name || !category || !size || !price) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    const [result] = await db.query(
      'UPDATE shoes_shop SET name = ?, brand = ?, category = ?, size = ?, price = ?, description = ? WHERE id = ?',
      [name, brand, category, size, price, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
});

// ลบสินค้า
app.delete('/api/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM shoes_shop WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});


app.listen(port, ()=>{
  console.log(`server running http://localhost:${port}`)
});