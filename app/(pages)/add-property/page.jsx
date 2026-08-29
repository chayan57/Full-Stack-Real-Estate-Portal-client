"use client"
import { useState } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';
import { useRouter } from 'next/navigation';


export default function AddProperty() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    propertyType: 'Apartment',
    purpose: 'For Sale',
    city: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    sizeSqFt: '',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    try {
      await axios.post('http://localhost:5000/api/properties', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Property Added Successfully!');
      router.push('/');
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Failed to add property.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 p-4">
              <h3 className="fw-bold mb-4">🏠 Post New Property</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input type="text" name="title" className="form-control" required onChange={handleChange} />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Price ($)</label>
                    <input type="number" name="price" className="form-control" required onChange={handleChange} />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label fw-bold">Type</label>
                    <select name="propertyType" className="form-select" onChange={handleChange}>
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Land">Land</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label fw-bold">Purpose</label>
                    <select name="purpose" className="form-select" onChange={handleChange}>
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">City</label>
                    <input type="text" name="city" className="form-control" required onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Address</label>
                    <input type="text" name="address" className="form-control" required onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Bedrooms</label>
                    <input type="number" name="bedrooms" className="form-control" onChange={handleChange} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Bathrooms</label>
                    <input type="number" name="bathrooms" className="form-control" onChange={handleChange} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Size (sqft)</label>
                    <input type="number" name="sizeSqFt" className="form-control" onChange={handleChange} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea name="description" className="form-control" rows="4" required onChange={handleChange}></textarea>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Upload Images (Max 5)</label>
                  <input type="file" className="form-control" multiple accept="image/*" onChange={handleImageChange} />
                </div>
                <button type="submit" className="btn btn-warning w-100 fw-bold" disabled={loading}>
                  {loading ? 'Posting...' : 'Submit Property'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}