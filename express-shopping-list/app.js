const express = require('express');
const app = express();
const items = require('./fakeDb');

app.use(express.json());

// GET /items - Get a list of shopping items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items - Add a new shopping item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

// GET /items/:name - Get a specific shopping item
app.get('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const foundItem = items.find(item => item.name === itemName);
  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// PATCH /items/:name - Update a specific shopping item
app.patch('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const updatedItem = req.body;
  const foundItem = items.find(item => item.name === itemName);
  if (foundItem) {
    foundItem.name = updatedItem.name || foundItem.name;
    foundItem.price = updatedItem.price || foundItem.price;
    res.json({ updated: foundItem });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// DELETE /items/:name - Delete a specific shopping item
app.delete('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const index = items.findIndex(item => item.name === itemName);
  if (index !== -1) {
    items.splice(index, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
