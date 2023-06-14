import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "./styles/Home.css";
import "./styles/SignUp.css";
import "./styles/loader.css";
const Home = () => {
  const [fullUrl, setURL] = useState();
  const [name, setName] = useState();
  const [Loading, setLoading] = useState(false);
  const [url, setUrlData] = useState([]);
  const [value, setValue] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getURL = async () => {
      try {
        await axios
          .get("https://urlshortener-backend-joshua.onrender.com/allUrls")
          .then((response) => {
            setUrlData(response.data);
            console.log(response.data);
          });
      } catch (err) {}
    };

    getURL();
  }, [value]);

  const generate = async () => {
    if (fullUrl == "" || name == "") {
      toast.warning("Please enter URL", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      setLoading(true);
      await axios
        .post("https://urlshortener-backend-joshua.onrender.com/shortUrls", {
          fullUrl,
          name,
        })
        .then((response) => {
          setLoading(false);
          setValue(!value);
          toast.success(response.data.message);
          setURL("");
          setName("");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error);
        });
    }
  };

  const go = async (url, full) => {
    try {
      await axios
        .get(`https://urlshortener-backend-joshua.onrender.com/${url}`)
        .then((response) => {
          console.log(response);
          setValue(!value);

          window.open(`${full}`, "_blank");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="navbar">
        <div
          className="logout"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
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
      <div className="signUp-Container">
        <h1 className="signUp-Heading">URL Shortener</h1>
        <div className="signUp-Form">
          <input
            className="signUp-Input"
            type="text"
            placeholder="URL Description"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            className="signUp-Input"
            type="text"
            placeholder="Enter URL"
            value={fullUrl}
            onChange={(event) => {
              setURL(event.target.value);
            }}
          />
          {Loading ? (
            <Loader />
          ) : (
            <button className="signUp-Button" onClick={generate}>
              Generate Short URL
            </button>
          )}
        </div>
        <ToastContainer />
      </div>

      <h1>URL Database</h1>
      <div className="table">
        <input className="tableHeading" value="URL"></input>
        <input className="full" value="FULL URL"></input>
        <input className="tableHeading" value="SHORT URL"></input>
        <input className="tableHeading" value="CLICKS"></input>
        {url.map((urls) => {
          return (
            <div>
              <input className="tableHeading" value={urls.name}></input>
              <input className="full" value={urls.full}></input>
              <input
                className="tableHeading short"
                value={urls.short}
                onClick={() => {
                  go(urls.short, urls.full);
                }}
              ></input>
              <input className="tableHeading" value={urls.clicks}></input>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
