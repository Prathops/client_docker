import { useState } from 'react';
import { createItem, uploadItemImage } from '../services/api';

function CreateItem() {
  const [form, setForm] = useState({ name: '', description: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      // Create item first
      const created = await createItem(form);
      let finalMessage = `Item created with ID ${created.id}`;

      // Upload image if provided
      if (image) {
        try {
          await uploadItemImage(created.id, image);
          finalMessage += ' and image uploaded';
        } catch (imgErr) {
          console.error('Image upload failed:', imgErr);
          finalMessage += ' (image upload failed, but item created)';
        }
      }

      setMessage(finalMessage);
      setForm({ name: '', description: '' });
      setImage(null);
      setImagePreview('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit} className="form-card">
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

        <label htmlFor="image">Item Image (Optional)</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setImagePreview('');
              }}
            >
              Remove Image
            </button>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}
    </section>
  );
}

export default CreateItem;
