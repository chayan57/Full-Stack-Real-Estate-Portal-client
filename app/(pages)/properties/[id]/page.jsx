"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [inquirySent, setInquirySent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/properties/${id}`
        );

        setProperty(res.data.data);
      } catch (error) {
        console.error("Property fetch error:", error);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();

    // property না আসা পর্যন্ত submit বন্ধ
    if (!property?._id) {
      alert("Property information is not available.");
      return;
    }

    setSending(true);

    try {
      await axios.post("http://localhost:5000/api/inquiries", {
        name: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone,
        message: inquiryData.message,
        property: property._id,
      });

      setInquirySent(true);

      setInquiryData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Inquiry error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to send inquiry"
      );
    } finally {
      setSending(false);
    }
  };

  if (!property) {
    return (
      <div className="container py-5 text-center">
        Loading property...
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h1>{property.title}</h1>

      <p>{property.description}</p>

      <h3>৳{property.price}</h3>

      <p>
        {property.location?.city},{" "}
        {property.location?.address}
      </p>

      <hr />

      <h3 className="mb-3">Send Inquiry</h3>

      {inquirySent && (
        <div className="alert alert-success">
          Message sent successfully!
        </div>
      )}

      <form onSubmit={handleInquirySubmit}>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Your Name"
          required
          value={inquiryData.name}
          onChange={(e) =>
            setInquiryData({
              ...inquiryData,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          className="form-control mb-2"
          placeholder="Your Email"
          required
          value={inquiryData.email}
          onChange={(e) =>
            setInquiryData({
              ...inquiryData,
              email: e.target.value,
            })
          }
        />

        <input
          type="tel"
          className="form-control mb-2"
          placeholder="Phone Number"
          value={inquiryData.phone}
          onChange={(e) =>
            setInquiryData({
              ...inquiryData,
              phone: e.target.value,
            })
          }
        />

        <textarea
          className="form-control mb-3"
          rows={3}
          placeholder="I am interested in this property..."
          required
          value={inquiryData.message}
          onChange={(e) =>
            setInquiryData({
              ...inquiryData,
              message: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="btn btn-warning w-100 fw-bold"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send Inquiry"}
        </button>

      </form>
    </div>
  );
}