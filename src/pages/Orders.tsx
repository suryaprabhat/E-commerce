import React, { useEffect, useState } from 'react';
import API from '../lib/api';
import '../styles/orders.css';

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
  };
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#ef4444',
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get('/orders/my');
        setOrders(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <div className="orders-loading">Loading your orders...</div>;
  if (error) return <div className="orders-error">{error}</div>;

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <div className="orders-empty-icon">📦</div>
        <h2>No orders yet</h2>
        <p>You haven't placed any orders. Start shopping!</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-card-header">
              <div>
                <p className="order-id">Order #{order._id.slice(-8).toUpperCase()}</p>
                <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <span
                className="order-status-badge"
                style={{ backgroundColor: statusColors[order.status] }}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item-row">
                  <img src={item.image} alt={item.name} className="order-item-img" />
                  <span className="order-item-name">{item.name}</span>
                  <span className="order-item-qty">x{item.quantity}</span>
                  <span className="order-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="order-card-footer">
              <p className="order-address">
                📍 {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p className="order-total">Total: <strong>₹{order.totalAmount.toLocaleString('en-IN')}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
