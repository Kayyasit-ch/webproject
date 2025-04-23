require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const db= mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME

}).promise();

app.get('/api/product' ,async (req,res) =>{
  try
  {
  const [row] = await db.query('SELECT * FROM products_project');
  res.status(200).json(row);
  } catch(err){
    res.status(500).json({message:'error fach',error:err});
  }
});

app.listen(port, ()=>{
  console.log(`server running http://localhost:${port}`)
})