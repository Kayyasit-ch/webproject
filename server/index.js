require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

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
  const [row] = await db.query('SELECT * FROM products_project');
  res.status(200).json(row);
  } catch(err){
    res.status(500).json({message:'error fach',error:err});
  }
});

app.post('/api/add', async (req, res) => {
  try {
    const { codeproduct, name, category, price, date, piece } = req.body;

    if (!codeproduct || !name || !category || !price || !date || !piece) {
      return res.status(400).json({ message: 'press enter your product' });
    }

    const [result] = await db.query(
      'INSERT INTO products_project (codeproduct, name, category, price, date, piece) VALUES (?, ?, ?, ?, ?, ?)',
      [codeproduct, name, category, price, date, piece]
    );

    res.status(201).json({ message: 'Product added', id: result.insertId });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Error added product', error: err.message });
  }
});

app.get('/api/product/:codeproduct' , async (req,res) => {
  try{
    const {codeproduct} =req.params
    const [rows] =await db.query('SELECT * FROM products_project WHERE codeproduct = ?', [codeproduct]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(rows);
  }
  catch(err){
    res.status(500).json({message:'error fach',error:err.message});
  }
  
});

app.put('/api/update/:id' , async (req,res) => {
  try{
    const {id}=req.params
    const { codeproduct, name, category, price, date, piece } = req.body;
    
    if (!codeproduct || !name || !category || !price || !date || !piece) {
      return res.status(400).json({ message: 'press enter your product' });
    }

    const [result] = await db.query(
      'UPDATE products_project SET codeproduct = ?,name = ?, category = ?, price = ?, date = ?,piece = ?  WHERE id=?',[codeproduct, name, category, price, date, piece,id]
    );

    if (result.affectedRows === 0){
      return res.status(404).json({message : 'Product not found'});
    }
    res.status(200).json({message: 'Update product sucessfully'});

  }
  catch(err){ 
    res.status(500).json({message: 'Erorr update product ' ,error:err.message});
  }
  
});

app.delete('/api/delete/:id' , async (req,res) => {
  try{
    const {id}=req.params
    const[result]=await db.query('DELETE FROM products_project WHERE id = ? ',[id]);
    if (result.affectedRows === 0){
      return res.status(404).json({message : 'Product not found'});
    }
    res.status(200).json({message: 'Delete product sucessfully'});


  }
  catch(err){
    res.status(500).json({message: 'Error delete product', error:err.message});

  }
  
});


app.listen(port, ()=>{
  console.log(`server running http://localhost:${port}`)
});