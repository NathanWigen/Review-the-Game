//This code is from Soleli.

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import { baseUrl } from "./constants";
import Review from "./Review";
import Footer from "./Footer"
import Header from "./Header"
import CreateReview from "./CreateReview";
import Login from "./Login"
import "./App.css";


  function App() {
    const [reviews, setReview] = useState([]);
    const [fetchReviews, setFetchReviews] = useState(false);

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
    
  
  
  return (
    <div className="App">
      <Header className="header"/>
      <Route exact path="/">
        <Login className="login"/>
      </Route>
      <Route path="/review">
        <div className="review-container">
          {reviews.map((review) => <Review key={review.id} review={review} setFetchReviews={setFetchReviews} />)}
          <CreateReview setFetchReviews={setFetchReviews} className="review"/>
        </div>
      </Route>
      <Footer className="footer"/>
    </div>
  );
}
export default App;