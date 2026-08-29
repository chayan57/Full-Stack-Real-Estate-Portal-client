import Link from 'next/link';

export default function PropertyCard({ property }) {
  const defaultImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={property.images && property.images.length > 0 ? property.images[0] : defaultImage}
          className="card-img-top"
          alt={property.title}
          style={{ height: '220px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between mb-2">
            <span className={`badge ${property.purpose === 'For Sale' ? 'bg-success' : 'bg-primary'}`}>
              {property.purpose}
            </span>
            <span className="fw-bold text-dark fs-5">${property.price?.toLocaleString()}</span>
          </div>
          <h5 className="card-title text-truncate">{property.title}</h5>
          <p className="card-text text-muted small mb-2">
            📍 {property.location?.address}, {property.location?.city}
          </p>
          <div className="d-flex justify-content-between border-top pt-2 mt-2 text-muted small">
            <span>🛏️ {property.bedrooms || 0} Beds</span>
            <span>🛁 {property.bathrooms || 0} Baths</span>
            <span>📐 {property.sizeSqFt || 0} sqft</span>
          </div>
        </div>
        <div className="card-footer bg-white border-0 pb-3">
          <Link href={`/properties/${property._id}`} className="btn btn-outline-dark w-100 btn-sm fw-bold">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}