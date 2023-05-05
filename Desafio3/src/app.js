const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

app.use(express.urlencoded({extended: true}));

function readProductsFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('./products.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const prodList = JSON.parse(data);
        resolve(prodList);
      }
    });
  });
}

app.get('/', (req, res) => {
  return res.send('Hello World!');
});

app.get('/products', async (req, res) => {
  try {
    const queryLimit = req.query.limit;
    const prodList = await readProductsFile();

    if (queryLimit) {
      const prodLimited = prodList.slice(0,queryLimit);
      return res.status(201).json({
        status: "Success",
        msg: "Retrieved limites results",
        data: prodLimited}); 
    }
    else {
      return res.status(201).json({
        status: "Success",
        msg: "Retrieved all products",
        data: prodList});
    }
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/products/:id', async (req, res) => {
  try {
    const prodId = req.params.id;
    const prodList = await readProductsFile();
    const prodEncontrado = prodList.find(p=>p.id === prodId);
  
  if (prodEncontrado) {
    return res.status(201).json({
      status: "Success",
      msg: "Retrieve only the product with id="+prodId,
      data: prodEncontrado});
      }
  else {
    return res.status(404).json({
      status: "Error",
      msg: "The id "+prodId+" does not exist",
      data: []});
  }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ://localhost:${port}`);
})
