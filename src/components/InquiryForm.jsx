import { useState } from 'react';
import api from '../api/client';
import './InquiryForm.css';

const initialForm = {
  customer_name: '',
  email: '',
  phone: '',
  city: '',
  quantity: '',
  message: '',
  product_id: '',
};

function InquiryForm({ productId, productName, onSuccess }) {
  const [form, setForm] = useState({
    ...initialForm,
    product_id: productId || '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/inquiry', {
        ...form,
        product_id: form.product_id ? Number(form.product_id) : null,
        quantity: form.quantity ? Number(form.quantity) : null,
      });
      setStatus({
        type: 'success',
        message: 'Your inquiry has been submitted! We will contact you soon.',
      });
      setForm({ ...initialForm, product_id: productId || '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Unable to submit inquiry. Please try again or call us directly.';
      setStatus({ type: 'error', message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      {productName && (
        <p className="inquiry-product-label">
          Inquiring about: <strong>{productName}</strong>
        </p>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="inquiry-name">Full Name</label>
          <input
            id="inquiry-name"
            type="text"
            name="customer_name"
            value={form.customer_name}
            onChange={handleChange}
            required
            placeholder="Your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inquiry-email">Email</label>
          <input
            id="inquiry-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="inquiry-phone">Phone</label>
          <input
            id="inquiry-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inquiry-city">City</label>
          <input
            id="inquiry-city"
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            placeholder="Your city"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="inquiry-quantity">Quantity (kg)</label>
        <input
          id="inquiry-quantity"
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          min="1"
          placeholder="Approximate quantity needed"
        />
      </div>

      <div className="form-group">
        <label htmlFor="inquiry-message">Message</label>
        <textarea
          id="inquiry-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Any special requirements or delivery notes..."
        />
      </div>

      {productId && (
        <input type="hidden" name="product_id" value={productId} />
      )}

      {status.message && (
        <p className={`form-status ${status.type}`}>{status.message}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Inquiry'}
      </button>
    </form>
  );
}

export default InquiryForm;
