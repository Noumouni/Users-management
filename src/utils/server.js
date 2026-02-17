
import express from 'express'
import dotenv from 'dotenv'

const app = express();
app.use(express.json());

app.get('/',(req, res) => {
  res.json({
    message : 'Users Management API'
    });
  
});
const port =process.env.PORT || 3000 ;
app.listen(3000, () => {
  console.log('Server is running on http://localhost:$(port)')
})





