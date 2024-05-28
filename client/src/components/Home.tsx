import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Welcome to the Bar App</h1>

      <Link to="login">
        <h2>Login to continue</h2>
      </Link>
    </div>
  );
};

export default Home;
