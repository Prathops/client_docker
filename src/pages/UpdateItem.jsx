import { useState } from 'react';
import { updateItem } from '../services/api';

function UpdateItem() {
  const [form, setForm] = useState({ id: '', name: '', description: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const updated = await updateItem(form.id, {
        name: form.name,
        description: form.description
      });

      setMessage(`Item ${updated.id} updated successfully`);
      setForm({ id: '', name: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item');
    }
  };

  return (
    <section>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <label htmlFor="id">Item ID</label>
        <input
          id="id"
          name="id"
          type="number"
          min="1"
          value={form.id}
          onChange={handleChange}
          required
        />

        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          required
        />

        <button type="submit">Update</button>
      </form>

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}
    </section>
  );
}

export default UpdateItem;
