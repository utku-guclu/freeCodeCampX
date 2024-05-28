import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BarList: React.FC = () => {
  const [bars, setBars] = useState<any[]>([]);
  const navigate = useNavigate();
  const { city } = useParams();

  useEffect(() => {
    const fetchBars = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          // Redirect to login if token is not present
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/bars?location=${city}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBars(response.data.businesses);
      } catch (error) {
        console.error("Error fetching bars", error);

        // Handle AxiosError specifically
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 401) {
            navigate("/login");
          }
        }
      }
    };

    fetchBars();
  }, [city, navigate]);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bars in {city}</h1>
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
          Go Back
        </Link>
      </div>
      {!(bars.length > 0) ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {bars.map((bar) => (
            <li key={bar.id}>{bar.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BarList;
