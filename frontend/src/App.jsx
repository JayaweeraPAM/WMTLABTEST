import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    // TODO (Student): Add missing fields for the state
    description: '',
    category: ''
  });

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/items', formData);
      fetchItems(); // Refresh the list
      setFormData({
        name: '',
        price: '',
        // TODO (Student): Clear the missing fields here
        description: '',
        category: ''
      });
    } catch (err) {
      console.error('Error creating item:', err);
    }
  };

  const handleDelete = async (id) => {
    // TODO (Student): Implement the delete functionality here
    // Hint: Use axios.delete() and then call fetchItems()
      try {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems(); // refresh list after delete
  } catch (err) {
    console.error('Error deleting item:', err);
  }
    console.log(`Delete item with ID: ${id}`);
  };

  return (
    <div className="container">
      <h1>Item Manager</h1>

      <div className="form-section">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* TODO (Student): Add input fields for 'description' and 'category' here */}
          <div className="form-group">
            <label>description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required>
              </textarea>
          </div>

          <div className="form-group">
            <label>category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required>
                <option value="" >Select Category</option>
                <otion value="Electronics">Electronics</otion>
                <option value="Clothing">Clothing</option>
                <option value="Food">Food</option>
                <option value="Other">Other</option>
              </select>
          </div>

          <button type="submit" className="btn-primary">Add Item</button>
        </form>
      </div>

      <div className="list-section">
        <h2>Items List</h2>
        {items.length === 0 ? (
          <p>No items found. Add some!</p>
        ) : (
          <ul className="item-list">
            {items.map((item) => (
              <li key={item._id} className="item-card">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Price: {item.description}</p>
                  <p>Price: {item.category}</p>
                  {/* TODO (Student): Display 'description' and 'category' here */}
                </div>
                <div className="item-actions">
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
