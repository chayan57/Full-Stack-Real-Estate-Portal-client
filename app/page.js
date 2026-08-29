"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SearchFilter from "./components/SearchFilter";
import PropertyCard from "./components/PropertyCard";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async (filters = {}) => {
    setLoading(true);

    try {
      const res = await axios.get(
        "https://full-stack-real-estate-portal-backe.vercel.app/api/properties",
        {
          params: filters,
        }
      );

      console.log("Search filters:", filters);
      console.log("API response:", res.data);

      setProperties(res.data.data || []);
    } catch (error) {
      console.error(
        "Error fetching properties:",
        error.response?.data || error.message
      );

      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <div
        className="bg-dark text-white text-center py-5 mb-4"
        style={{ backgroundColor: "#1a252f" }}
      >
        <div className="container py-4">
          <h1 className="display-4 fw-bold">
            Find Your Dream Property
          </h1>

          <p className="lead text-light">
            Explore apartments, houses, and commercial spaces easily.
          </p>
        </div>
      </div>

      <div className="container">

        {/* Search Filter */}
        <SearchFilter onSearch={fetchProperties} />

        {/* Property List */}
        <h3 className="fw-bold mb-4">
          Featured Listings
        </h3>

        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-primary"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>
          </div>
        ) : properties.length === 0 ? (
          <div className="alert alert-info text-center">
            No properties found matching your criteria.
          </div>
        ) : (
          <div className="row">
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