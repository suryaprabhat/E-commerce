import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../lib/api';
import { useCart } from '../context/CartContext';
import '../styles/checkout.css';

const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        shippingAddress: form,
        paymentMethod: 'COD',
      };
      const { data } = await API.post('/orders', payload);
      setOrderId(data._id);
      clearCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Order placement failed');
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="order-success">
        <div className="success-icon">✅</div>
        <h1>Order Placed Successfully!</h1>
        <p className="order-id-text">Order ID: <strong>{orderId}</strong></p>
        <p>Thank you for your purchase! You'll receive a confirmation shortly.</p>
        <div className="success-actions">
          <button onClick={() => navigate('/orders')} className="view-orders-btn">View My Orders</button>
          <button onClick={() => navigate('/products')} className="continue-shopping-btn-success">Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form onSubmit={handlePlaceOrder} className="checkout-form">
          <h2>Shipping Details</h2>
          {error && <div className="checkout-error">{error}</div>}

          <div className="form-group">
            <label>Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="123 Main Street, Apt 4B" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input name="city" value={form.city} onChange={handleChange} placeholder="Mumbai" required />
            </div>
            <div className="form-group">
              <label>State</label>
              <input name="state" value={form.state} onChange={handleChange} placeholder="Maharashtra" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Pincode</label>
              <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="400001" required pattern="\d{6}" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
            </div>
          </div>

          <div className="payment-method">
            <h3>Payment Method</h3>
            <label className="payment-option">
              <input type="radio" name="payment" value="COD" defaultChecked readOnly />
              <span>Cash on Delivery (COD)</span>
            </label>
          </div>

          <button type="submit" className="place-order-btn" disabled={loading || items.length === 0}>
            {loading ? 'Placing Order...' : `Place Order — ₹${totalPrice.toLocaleString('en-IN')}`}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div key={item.productId} className="checkout-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p className="checkout-item-name">{item.name}</p>
                <p className="checkout-item-qty">Qty: {item.quantity}</p>
              </div>
              <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
          ))}
          <div className="checkout-total">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
