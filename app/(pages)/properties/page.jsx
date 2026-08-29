"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import PropertyCard from "@/app/components/PropertyCard";


function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/properties"
        );

        setProperties(res.data.data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="text-center mb-5">
          <h1 className="fw-bold">All Properties</h1>
          <p className="text-muted">
            Explore all available properties
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-warning"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>
          </div>
        ) : properties.length === 0 ? (
          <div className="alert alert-info text-center">
            No properties available.
          </div>
        ) : (
          <div className="row g-4">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        )}

      </div>
    </>
  );
}

export default PropertiesPage;