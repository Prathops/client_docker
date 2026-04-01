import { useEffect, useState } from 'react';
import { getItems } from '../services/api';

function GetItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const openImageModal = (item) => {
    setSelectedImage(item);
    setModalOpen(true);
  };

  const closeImageModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return <p>Loading items...</p>;
  }

  return (
    <section>
      <h2>All Items</h2>
      {error && <p className="error-text">{error}</p>}
      {!error && items.length === 0 && <p>No items found.</p>}
      {items.length > 0 && (
        <table className="items-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className="item-name">{item.name}</td>
                <td className="item-desc">{item.description}</td>
                <td className="image-cell">
                  {item.image_url ? (
                    <button
                      className="view-image-btn"
                      onClick={() => openImageModal(item)}
                    >
                      📷 View Image
                    </button>
                  ) : (
                    <span className="no-image">No Image</span>
                  )}
                </td>
                <td className="date-cell">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Image Modal */}
      {modalOpen && selectedImage && (
        <div className="modal-overlay" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeImageModal}>×</button>
            <h3>{selectedImage.name}</h3>
            <img
              src={`${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5010'}${selectedImage.image_url}`}
              alt={selectedImage.name}
              className="modal-image"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23ddd" width="400" height="400"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="18"%3EImage Not Available%3C/text%3E%3C/svg%3E';
              }}
            />
            <p className="modal-description">{selectedImage.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default GetItems;
