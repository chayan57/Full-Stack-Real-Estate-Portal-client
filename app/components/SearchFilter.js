import { useState } from 'react';

export default function SearchFilter({ onSearch }) {
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ city, propertyType, purpose });
  };

  return (
    <div className="card shadow border-0 p-4 mb-5 bg-white rounded">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-3">
          <label className="form-label fw-bold">City/Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Dhaka"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label fw-bold">Property Type</label>
          <select
            className="form-select"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Land">Land</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label fw-bold">Purpose</label>
          <select
            className="form-select"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="">All Purposes</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <button type="submit" className="btn btn-warning w-100 fw-bold">
            🔍 Search Properties
          </button>
        </div>
      </form>
    </div>
  );
}