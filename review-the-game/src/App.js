// import React, { useEffect, useState } from 'react';
// import axios from "axios"
// import './App.css';
// import { baseUrl } from './constants';
// import CreateReview from './CreateReview'

// function App() {
  // const [reviews, setReview] = useState([])
  // const [fetchReviews, setFetchReviews] = useState(false)

  // useEffect(() => {
  //   const getReview = async() => {
  //     const airtableURL = `${baseUrl}`
  //     const resp = await axios.get(airtableURL, {
  //       headers: {
  //         Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
  //       },
  //     })
  //     setReview(resp.data.records)
  //   }
  //   getReview()
  // },[fetchReviews])
  
//   return (
//     <div className="App">
//       <h1>Review Your Games</h1>
//       <CreateReview/>
//     </div>
//   );
// }

// export default App;


//This code is from Soleli.

import React, { useEffect, useState } from "react";
import axios from "axios"
import {
  BrowserRouter as Route,
  Switch,
  Link,
  useHistory
} from "react-router-dom";
// import CreateReview from './CreateReview'
import { baseUrl } from './constants';
import Review from "./Review"
import "./App.css";


function App() {
  const [reviews, setReview] = useState([])
  const [fetchReviews, setFetchReviews] = useState(false)
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [usernameInput, setUsernameInput] = useState("");
  const [userPassword, setUserPassword] = useState(localStorage.getItem("userPassword"));
  const [userPasswordInput, setUserPasswordInput] = useState("");

  useEffect(() => {
    const getReview = async() => {
      const airtableUrl = `${baseUrl}`
      const resp = await axios.get(airtableUrl, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      })
      setReview(resp.data.records)
    }
    getReview()
  },[fetchReviews])

  // const history = useHistory();
  useEffect(() => {
    if (username) {
      // history.push('/home');
    }
  }, []);
  const takeMeThere = () => {
    localStorage.setItem("username", usernameInput);
    setUsername(usernameInput);
    localStorage.setItem("password", userPasswordInput);
    setUserPassword(userPasswordInput);
    // history.push("/home");
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
          onChange={(e) => setUserPasswordInput(e.target.value)}
        />
        <button onClick={takeMeThere}>Submit</button>
      </Route>
      <Route path="/review">
        <h2>{username}</h2>
        <Review />
      </Route>
    </div>
  );
}


export default App;