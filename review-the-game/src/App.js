
//This code is from Soleli.
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";
import { baseUrl } from "./constants";
import Review from "./Review";
import "./App.css";
import CreateReview from "./CreateReview";
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
  }, [history, username]);
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
      <header className="header">Review Your Game</header>
      <nav>
        <CreateReview setFetchReviews={setFetchReviews}/>
      </nav>
      <Route exact path="/">
        <label className="user">Username:</label>
        <input
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <label className="password">Password:</label>
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
          {reviews.map((review) => <Review key={review.id} review={review} setFetchReviews={setFetchReviews}/>)}
        </div>
      </Route>
      <footer className="footer">Website Made By:Nathan Wigen</footer>
    </div>
  );
}
export default App;