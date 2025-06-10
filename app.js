const express = require('express')
const db = require('./config/db')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
db.query('SELECT 1')
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('DB connection error:', err));

app.get('/',(req,res)=>{
    res.send('Survey API running...')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});