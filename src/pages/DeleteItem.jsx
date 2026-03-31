import { useState } from 'react';
import { deleteItem } from '../services/api';

function DeleteItem() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await deleteItem(id);
      setMessage(response.message || `Item ${id} deleted successfully`);
      setId('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete item');
    }
  };

  return (
    <section>
      <h2>Delete Item</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <label htmlFor="id">Item ID</label>
        <input
          id="id"
          name="id"
          type="number"
          min="1"
          value={id}
          onChange={(event) => setId(event.target.value)}
          required
        />

        <button type="submit">Delete</button>
      </form>

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}
    </section>
  );
}

export default DeleteItem;
