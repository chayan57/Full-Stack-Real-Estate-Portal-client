import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';


export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch properties
        const resProps = await axios.get('https://full-stack-real-estate-portal-backe.vercel.app/api/properties');
        setProperties(resProps.data.data);

        // Fetch Inquiries (For demo purpose getting all)
        const resInq = await axios.get('https://full-stack-real-estate-portal-backe.vercel.app/api/inquiries');
        setInquiries(resInq.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`https://full-stack-real-estate-portal-backe.vercel.app/api/properties/${id}`);
        setProperties(properties.filter((p) => p._id !== id));
        alert('Property Deleted Successfully');
      } catch (error) {
        alert('Failed to delete property');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="fw-bold mb-4">⚙️ Admin & Agent Dashboard</h2>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>
        ) : (
          <div className="row">
            {/* Property Management */}
            <div className="col-lg-7 mb-4">
              <div className="card shadow-sm border-0 p-3">
                <h4 className="fw-bold mb-3">My Listings ({properties.length})</h4>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((item) => (
                        <tr key={item._id}>
                          <td className="fw-bold">{item.title}</td>
                          <td className="text-success">${item.price?.toLocaleString()}</td>
                          <td><span className="badge bg-secondary">{item.propertyType}</span></td>
                          <td>
                            <button 
                              onClick={() => handleDelete(item._id)} 
                              className="btn btn-danger btn-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Inquiries / Lead Management */}
            <div className="col-lg-5">
              <div className="card shadow-sm border-0 p-3">
                <h4 className="fw-bold mb-3">Client Inquiries ({inquiries.length})</h4>
                {inquiries.length === 0 ? (
                  <p className="text-muted">No inquiries received yet.</p>
                ) : (
                  <div className="list-group">
                    {inquiries.map((inq) => (
                      <div key={inq._id} className="list-group-item list-group-item-action mb-2 rounded border-0 bg-light">
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-1 fw-bold">{inq.name}</h6>
                          <small className="text-muted">{inq.phone}</small>
                        </div>
                        <p className="mb-1 text-muted small">{inq.message}</p>
                        <small className="text-primary">{inq.email}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}