import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import './AdminDashboard.css';

const emptyProduct = {
  name: '',
  category: 'Apples',
  variety: '',
  description: '',
  price: '',
  stock: '',
  size: '',
  weight: '',
  image: '',
  season: '',
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const fetchData = async () => {
    try {
      const [prodRes, inqRes] = await Promise.all([
        api.get('/products'),
        api.get('/inquiry'),
      ]);
      setProducts(prodRes.data);
      setInquiries(inqRes.data);
    } catch {
      setStatus('Failed to load data. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyProduct);
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      variety: product.variety || '',
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      size: product.size || '',
      weight: product.weight || '',
      image: product.image || '',
      season: product.season || '',
    });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
        setStatus('Product updated successfully.');
      } else {
        await api.post('/products', payload);
        setStatus('Product added successfully.');
      }
      resetForm();
      fetchData();
    } catch (err) {
      setStatus(err.response?.data?.message || 'Operation failed.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      setStatus('Product deleted.');
      fetchData();
    } catch {
      setStatus('Failed to delete product.');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {adminUser.name || adminUser.email || 'Admin'}</p>
          </div>
          <button type="button" className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {status && <p className="admin-status">{status}</p>}

        <div className="admin-tabs">
          <button
            type="button"
            className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products ({products.length})
          </button>
          <button
            type="button"
            className={`admin-tab ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            Inquiries ({inquiries.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="admin-products-layout">
            <section className="admin-form-section">
              <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <form className="admin-product-form" onSubmit={handleSubmit}>
                <div className="admin-form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" value={form.name} onChange={handleFormChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" value={form.category} onChange={handleFormChange}>
                      <option value="Apples">Apples</option>
                      <option value="Pears">Pears</option>
                      <option value="Peaches">Peaches</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="variety">Variety</label>
                    <input id="variety" name="variety" value={form.variety} onChange={handleFormChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price (₹/kg)</label>
                    <input id="price" name="price" type="number" value={form.price} onChange={handleFormChange} required min="0" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="stock">Stock (kg)</label>
                    <input id="stock" name="stock" type="number" value={form.stock} onChange={handleFormChange} required min="0" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="size">Size</label>
                    <input id="size" name="size" value={form.size} onChange={handleFormChange} placeholder="Medium-Large" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="weight">Weight</label>
                    <input id="weight" name="weight" value={form.weight} onChange={handleFormChange} placeholder="150-200g" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="season">Season</label>
                    <input id="season" name="season" value={form.season} onChange={handleFormChange} placeholder="September – November" />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="image">Image URL</label>
                    <input id="image" name="image" value={form.image} onChange={handleFormChange} placeholder="https://..." />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={form.description} onChange={handleFormChange} rows={3} />
                  </div>
                </div>
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update Product' : 'Add Product'}
                  </button>
                  {editingId && (
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </section>

            <section className="admin-list-section">
              <h2>All Products</h2>
              {loading ? (
                <p className="loading-state">Loading...</p>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td>{p.name}</td>
                          <td>{p.category}</td>
                          <td>₹{p.price}</td>
                          <td>{p.stock} kg</td>
                          <td className="actions-cell">
                            <button type="button" className="btn-edit" onClick={() => handleEdit(p)}>
                              Edit
                            </button>
                            <button type="button" className="btn-delete" onClick={() => handleDelete(p.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <section className="admin-inquiries">
            <h2>Customer Inquiries</h2>
            {loading ? (
              <p className="loading-state">Loading...</p>
            ) : inquiries.length === 0 ? (
              <p className="empty-state">No inquiries yet.</p>
            ) : (
              <div className="inquiries-list">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="inquiry-card">
                    <div className="inquiry-card-header">
                      <strong>{inq.customer_name}</strong>
                      <span className="inquiry-date">
                        {new Date(inq.created_at).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <p><strong>Email:</strong> {inq.email}</p>
                    <p><strong>Phone:</strong> {inq.phone}</p>
                    <p><strong>City:</strong> {inq.city}</p>
                    {inq.quantity && <p><strong>Quantity:</strong> {inq.quantity} kg</p>}
                    {inq.product_name && <p><strong>Product:</strong> {inq.product_name}</p>}
                    {inq.message && <p className="inquiry-message">{inq.message}</p>}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
