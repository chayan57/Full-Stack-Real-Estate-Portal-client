import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-5">
        <div className="row g-4">

          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <h3 className="fw-bold text-warning mb-3">
              EstateHub
            </h3>

            <p className="text-secondary">
              Find your perfect home, apartment, land, or
              commercial property with ease.
            </p>

            <div className="d-flex gap-3 mt-3">
              <a
                href="#"
                className="text-white text-decoration-none"
              >
                Facebook
              </a>

              <a
                href="#"
                className="text-white text-decoration-none"
              >
                Instagram
              </a>

              <a
                href="#"
                className="text-white text-decoration-none"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3">
              Quick Links
            </h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  href="/"
                  className="text-secondary text-decoration-none"
                >
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  href="/properties"
                  className="text-secondary text-decoration-none"
                >
                  Properties
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  href="/about"
                  className="text-secondary text-decoration-none"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-secondary text-decoration-none"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3">
              Property
            </h5>

            <ul className="list-unstyled">
              <li className="mb-2 text-secondary">
                Apartments
              </li>

              <li className="mb-2 text-secondary">
                Houses
              </li>

              <li className="mb-2 text-secondary">
                Land
              </li>

              <li className="text-secondary">
                Commercial
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3">
              Contact Us
            </h5>

            <p className="text-secondary mb-2">
              📍 Dhaka, Bangladesh
            </p>

            <p className="text-secondary mb-2">
              📞 +880 1712-345678
            </p>

            <p className="text-secondary mb-0">
              ✉️ info@estatehub.com
            </p>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-top border-secondary">
        <div className="container py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">

            <p className="mb-0 text-secondary">
              © {new Date().getFullYear()} EstateHub. All
              rights reserved.
            </p>

            <div className="d-flex gap-3">
              <Link
                href="/privacy"
                className="text-secondary text-decoration-none"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-secondary text-decoration-none"
              >
                Terms & Conditions
              </Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}