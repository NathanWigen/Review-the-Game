import React, { useEffect, useState } from 'react';
import axios from "axios"
import './App.css';
import { baseUrl } from './constants';
import CreateReview from './CreateReview'

function App() {
  const [reviews, setReview] = useState([])
  const [fetchReviews, setFetchReviews] = useState(false)

  useEffect(() => {
    const getReview = async() => {
      const airtableURL = `${baseUrl}`
      const resp = await axios.get(airtableURL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      })
      setReview(resp.data.records)
    }
    getReview()
  },[fetchReviews])
  
  return (
    <div className="App">
      <h1>Review Your Games</h1>
      <CreateReview/>
    </div>
  );
}

export default App;
