import { useState } from 'react';
import { updateItem, uploadItemImage, getItemImages, removeItemImage } from '../services/api';

function UpdateItem() {
  const [form, setForm] = useState({ id: '', name: '', description: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImage, setCurrentImage] = useState('');
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

  const loadItemImage = async (itemId) => {
    try {
      const itemData = await getItemImages(itemId);
      if (itemData.imageUrl) {
        setCurrentImage(itemData.imageUrl);
      }
    } catch (err) {
      console.error('Failed to load item image:', err);
    }
  };

  const handleIdBlur = () => {
    if (form.id) {
      loadItemImage(form.id);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const updated = await updateItem(form.id, {
        name: form.name,
        description: form.description
      });

      let finalMessage = `Item ${updated.id} updated successfully`;

      // Upload new image if provided
      if (image) {
        try {
          await uploadItemImage(form.id, image);
          finalMessage += ' and image updated';
          setCurrentImage(imagePreview);
        } catch (imgErr) {
          console.error('Image upload failed:', imgErr);
          finalMessage += ' (image upload failed, but item updated)';
        }
      }

      setMessage(finalMessage);
      setForm({ id: '', name: '', description: '' });
      setImage(null);
      setImagePreview('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item');
    } finally {
      setLoading(false);
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
          onBlur={handleIdBlur}
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

        {currentImage && (
          <div className="current-image">
            <label>Current Image:</label>
            <img 
              src={currentImage}
              alt="Current"
              style={{ maxWidth: '150px', maxHeight: '150px' }}
            />
            <button
              type="button"
              className="remove-image-btn"
              onClick={async () => {
                try {
                  await removeItemImage(form.id);
                  setCurrentImage('');
                  setMessage('Image removed successfully');
                } catch (err) {
                  setError('Failed to remove image: ' + (err.response?.data?.message || err.message));
                }
              }}
              title="Remove current image from item"
            >
              🗑️ Remove Image
            </button>
          </div>
        )}

        <label htmlFor="image">Update Image (Optional)</label>
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
              Remove New Image
            </button>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>

      {message && (
        <p className="success-text">
          {message}
          <button
            type="button"
            onClick={() => setMessage('')}
            style={{ marginLeft: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
        </p>
      )}
      {error && (
        <p className="error-text">
          {error}
          <button
            type="button"
            onClick={() => setError('')}
            style={{ marginLeft: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
        </p>
      )}
    </section>
  );
}

export default UpdateItem;
