//This code is from Soleli.

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route} from "react-router-dom";
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
    // const [username, setUsername] = useState(localStorage.getItem("username"));
    // const [usernameInput, setUsernameInput] = useState("");

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
    
  
  // const history = useHistory();
  // useEffect(() => {
  //   if (username) {
  //     history.push('/review');
  //   }
  // }, [history, username]);
  // const takeMeThere = () => {
  //   localStorage.setItem("username", usernameInput);
  //   setUsername(usernameInput);
  //   history.push("/review");
  // };
  return (
    <div className="App">
      <Header />
      <Route exact path="/">
        <Login />
        {/* <label className="user">Username:</label>
        <input
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        /> */}
        {/* <button onClick={takeMeThere}>Submit</button> */}
      </Route>
      <Route path="/review">
        <div className="review-container">
          {reviews.map((review) => <Review key={review.id} review={review} setFetchReviews={setFetchReviews} />)}
          <CreateReview setFetchReviews={setFetchReviews}/>
        </div>
      </Route>
      <Footer />
    </div>
  );
}
export default App;