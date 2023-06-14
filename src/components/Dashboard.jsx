import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Dashboard.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      try {
        await axios
          .get(
            "https://urlshortener-backend-joshua.onrender.com/url/daily-count"
          )
          .then((response) => {
            setCount(response.data[0].count);
          });
      } catch (err) {}
    };

    getCount();
  }, []);
  return (
    <div>
      <div className="navbar">
        <div
          className="logout"
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </div>

        <div
          className="logout"
          onClick={() => {
            navigate("/login");
          }}
        >
          LOG OUT
        </div>
      </div>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <img
          className="dash-image"
          src="https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554_640.png"
          height="200px"
          width="200px"
        ></img>
        <h1>No of URLS created this month {count}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
