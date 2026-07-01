const express = require('express');
const server = express();
server.use(express.json()); // Parse JSON bodies

//Assumed database
let products =[
   { id :1,   name:'bags',    quantity:5 },
   { id: 2,   name:'dresses', quantity:10},
   { id: 3,   name:'shoes',    quantity:6},
]

// GET-fetches all products 
server.get('/products', (req, res) => {
  res.status(200).json(products); // Send array as JSON
});

//GET-Gets only one product
server.get('/products/:id', (req, res) => {
  const product = products.find(product => product.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
});

//POST-adds a new product to the list
server.post('/products', (req, res) => {

  if (!req.body.name || req.body.quantity === undefined) {
  return res.status(400).json({
    message:'Product name and quantity are required'
  });//validates the inputs of the user before adding to the list
  }
  const newProduct = { id: products.length + 1, ...req.body }; // Auto-ID
  products.push(newProduct);
  res.status(201).json({
    message: 'Product added successfully',
    product: newProduct
  }); // Echo back
});

//PATCH-edits a product in the list
server.patch('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);//parseint converts the string to an integer

  const product = products.find(product => product.id === id);//finds the product with the given id
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }//if the product is not found, return a 404 error(Not Found)
  if (req.body.name){
    product.name = req.body.name;}//if the client sends a new name, update the product's name
  
    if (req.body.quantity !== undefined) {
      product.quantity = req.body.quantity;//if the client sends a new quantity, update the product's quantity
    }
    res.json({
      message: 'Product updated successfully',
      product: product
    });//return  the updated product to the client  }
});



//DELETE-removes a product from the list
server.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product =products.find(product => product.id === id);//checks if the product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    products = products.filter(product => product.id !== id);
    res.json({ message: 'Product deleted successfully' });
});

const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});