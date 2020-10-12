
//This code is from Soleli.
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Switch, Link, useHistory } from "react-router-dom";
// import CreateReview from './CreateReview'
import { baseUrl } from "./constants";
import Review from "./Review";
import "./App.css";
  function App() {
    const [reviews, setReview] = useState([]);
    const [fetchReviews, setFetchReviews] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [usernameInput, setUsernameInput] = useState("");
    const [userPassword, setUserPassword] = useState(
    localStorage.getItem("userPassword")
  );
    const [userPasswordInput, setUserPasswordInput] = useState("");

  useEffect(() => {
    const getReview = async () => {
      const airtableUrl = `${baseUrl}`;
      const resp = await axios.get(airtableUrl, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      setReview(resp.data.records);
    };
    getReview();
  }, [fetchReviews]);
    
  
  const history = useHistory();
  useEffect(() => {
    if (username) {
      history.push('/review');
    }
  }, []);
  const takeMeThere = () => {
    if (userPasswordInput.length < 6) {
      alert("You need to input more than six numbers");
    }
    localStorage.setItem("username", usernameInput);
    setUsername(usernameInput);
    localStorage.setItem("password", userPasswordInput);
    setUserPassword(userPasswordInput);
    history.push("/review");
  };
  return (
    <div className="App">
      <header>Review Your Game</header>
      <Route exact path="/">
        <label>Username:</label>
        <input
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <label>Password:</label>
        <input
          value={userPasswordInput}
          maxLength={6}
          type="number"
          onChange={(e) => setUserPasswordInput(e.target.value)}
        />
        <button onClick={takeMeThere}>Submit</button>
      </Route>
      <Route path="/review">
        <h2>{username}</h2>
        <div className="review-container">
          {reviews.map((review) => <Review review={review}/>)}
        </div>
      </Route>
    </div>
  );
}
export default App;