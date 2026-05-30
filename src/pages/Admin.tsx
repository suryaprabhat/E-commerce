import React, { useEffect, useState } from 'react';
import API from '../lib/api';
import '../styles/admin.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
}

interface Order {
  _id: string;
  user: { name: string; email: string };
  totalAmount: number;
  status: string;
  createdAt: string;
  items: { name: string; quantity: number; price: number }[];
}

const EMPTY_PRODUCT = { name: '', price: 0, description: '', category: 'Electronics', inStock: true, images: [''], rating: 0, reviews: 0 };

const Admin: React.FC = () => {
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const fetchProducts = async () => {
    const { data } = await API.get('/products');
    setProducts(data);
  };

  const fetchOrders = async () => {
    const { data } = await API.get('/orders');
    setOrders(data);
  };

  useEffect(() => {
    Promise.all([fetchProducts(), fetchOrders()]).finally(() => setLoading(false));
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value });
  };

  const openCreate = () => { setForm(EMPTY_PRODUCT); setEditProduct(null); setShowForm(true); setFormError(''); };
  const openEdit = (p: Product) => {
    setForm({ name: p.name, price: p.price, description: p.description, category: p.category, inStock: p.inStock, images: p.images, rating: p.rating, reviews: p.reviews });
    setEditProduct(p);
    setShowForm(true);
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      const payload = { ...form, images: typeof form.images === 'string' ? (form.images as string).split(',').map((s) => s.trim()) : form.images };
      if (editProduct) {
        await API.put(`/products/${editProduct._id}`, payload);
      } else {
        await API.post('/products', payload);
      }
      await fetchProducts();
      setShowForm(false);
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      await fetchProducts();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status });
      await fetchOrders();
    } catch (err: any) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="admin-loading">Loading admin panel...</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🛠️ Admin Dashboard</h1>
        <div className="admin-stats">
          <div className="stat-card"><span className="stat-number">{products.length}</span><span className="stat-label">Products</span></div>
          <div className="stat-card"><span className="stat-number">{orders.length}</span><span className="stat-label">Orders</span></div>
          <div className="stat-card"><span className="stat-number">₹{orders.reduce((s, o) => s + o.totalAmount, 0).toLocaleString('en-IN')}</span><span className="stat-label">Revenue</span></div>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={`admin-tab ${tab === 'products' ? 'active' : ''}`} onClick={() => setTab('products')}>📦 Products</button>
        <button className={`admin-tab ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>🛒 Orders</button>
      </div>

      {tab === 'products' && (
        <div className="admin-products">
          <div className="section-toolbar">
            <h2>Products ({products.length})</h2>
            <button className="add-product-btn" onClick={openCreate}>+ Add Product</button>
          </div>

          {showForm && (
            <div className="product-form-overlay">
              <div className="product-form-modal">
                <h3>{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
                {formError && <div className="form-error">{formError}</div>}
                <form onSubmit={handleSubmit} className="product-form">
                  <div className="form-group"><label>Name</label><input name="name" value={form.name} onChange={handleFormChange} required /></div>
                  <div className="form-row">
                    <div className="form-group"><label>Price (₹)</label><input type="number" name="price" value={form.price} onChange={handleFormChange} required min={0} /></div>
                    <div className="form-group"><label>Category</label>
                      <select name="category" value={form.category} onChange={handleFormChange}>
                        <option>Electronics</option>
                        <option>Furniture</option>
                        <option>Home Decor</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group"><label>Description</label><textarea name="description" value={form.description} onChange={handleFormChange} required rows={3} /></div>
                  <div className="form-group"><label>Image URL(s) (comma separated)</label><input name="images" value={Array.isArray(form.images) ? form.images.join(', ') : form.images} onChange={handleFormChange} placeholder="https://..." /></div>
                  <div className="form-group inline-check"><label><input type="checkbox" name="inStock" checked={form.inStock} onChange={handleFormChange} /> In Stock</label></div>
                  <div className="form-actions">
                    <button type="submit" className="save-btn" disabled={formLoading}>{formLoading ? 'Saving...' : 'Save'}</button>
                    <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="products-table-wrap">
            <table className="products-table">
              <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td><img src={p.images[0]} alt={p.name} className="table-img" /></td>
                    <td>{p.name}</td>
                    <td><span className="category-badge">{p.category}</span></td>
                    <td>₹{p.price.toLocaleString('en-IN')}</td>
                    <td><span className={`stock-badge ${p.inStock ? 'in' : 'out'}`}>{p.inStock ? 'In Stock' : 'Out'}</span></td>
                    <td>
                      <button className="edit-btn" onClick={() => openEdit(p)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="admin-orders">
          <h2>All Orders ({orders.length})</h2>
          <div className="orders-table-wrap">
            <table className="orders-table">
              <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td className="order-id-cell">#{o._id.slice(-8).toUpperCase()}</td>
                    <td><div>{o.user?.name || 'N/A'}</div><div className="user-email">{o.user?.email}</div></td>
                    <td>{o.items.map((i) => `${i.name} x${i.quantity}`).join(', ')}</td>
                    <td>₹{o.totalAmount.toLocaleString('en-IN')}</td>
                    <td>
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o._id, e.target.value)}
                        className={`status-select status-${o.status}`}
                      >
                        {['pending','processing','shipped','delivered','cancelled'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                      </select>
                    </td>
                    <td>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
