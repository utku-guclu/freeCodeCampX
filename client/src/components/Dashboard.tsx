import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [city, setCity] = useState<string>("Tokyo");

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Welcome to the Bar App</h1>
      <form className="my-4">
        <label htmlFor="city" className="mr-2">
          Select City:
        </label>
        <select
          id="city"
          name="city"
          className="border rounded px-2 py-1"
          value={city}
          onChange={handleCityChange}
        >
          <option value="Tokyo">Tokyo</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Berlin">Berlin</option>
          <option value="Istanbul">Istanbul</option>
          <option value="Stockholm">Stockholm</option>
          <option value="Hong Kong">Hong Kong</option>
        </select>
        <Link
          to={`/bars/${city}`}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          View Bars
        </Link>
      </form>
    </div>
  );
};

export default Dashboard;
