

import express from 'express'

const app = express()
app.use(express.json());

app.get('/',(req, res) => {
  res.json(body:{
    message : 'Users Management API'
    });
  
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})





// Nous avons crée un serveur qui ecoute sur le port 3000
//importer  http Api node qui va nous aider a crée un server