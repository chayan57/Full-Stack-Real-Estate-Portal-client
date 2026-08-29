import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold text-warning">
          🏠 RealEstate Portal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link active">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/properties" className="nav-link">Properties</Link>
            </li>
            <li className="nav-item">
              <Link href="/add-property" className="btn btn-warning ms-lg-3">
                + Post Property
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}