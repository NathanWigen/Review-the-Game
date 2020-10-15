import React, { useState } from "react"
import axios from "axios"

function CreateReview(props) {
  const [gameTitle, setGameTitle] = useState("")
  const [review, setReview] = useState("")
  const [author, setAuthor] = useState("")
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const fields = {
      gameTitle,
      review,
      author,
    }
    const airtableUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/reviews`;
    await axios.post(airtableUrl, { fields }, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`
      }
    })
    props.setFetchReviews(prevFetchReviews=>!prevFetchReviews)

    setGameTitle("")
    setReview("")
    setAuthor("")
  }
  
  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <label htmlFor="game title">Game Title:</label>
      <input name="game title" type="text" value={gameTitle} onChange={(e) => setGameTitle(e.target.value)} />
      <label htmlFor="review">Review:</label>
      <input name="review" type="text" value={review} onChange={(e) => setReview(e.target.value)} />
      <label htmlFor="author">Author:</label>
      <input name="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <button type="submit">Submit Review</button>
    </form> 
  )
}

export default CreateReview