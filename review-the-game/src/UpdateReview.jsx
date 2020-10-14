import React, { useState } from "react"
import {baseUrl} from "./constants"
import axios from "axios"

function UpdateReview(props) {
  const [gameTitle, setGameTitle] = useState(props.review.fields.gameTitle)
  const [review, setReview] = useState(props.review.fields.review)
  const [author, setAuthor] = useState(props.review.fields.author)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fields = {
      gameTitle,
      review,
      author
    }
    const airtableUrl = `${baseUrl}/${props.review.id}`
    await axios.put(
      airtableUrl,
      { fields },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      }
    )
    props.setFetchReviews(!props.fetchReviews)
  }

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <label htmlFor="Game Title">Game Title:</label>
      <input
        name="Game Title"
        type="text"
        placeholder="Game Title"
        value={gameTitle}
        onChange={(e)=> setGameTitle(e.target.value)}
      />
      <label htmlFor="review">Review:</label>
      <input
        name="review"
        type="text"
        placeholder="review"
        value={review}
        onChange={(e)=> setReview(e.target.value)}
      />
      <label htmlFor="author">Author:</label>
      <input
        name="author"
        type="text"
        placeholder="your name"
        value={author}
        onChange={(e)=> setAuthor(e.target.value)}
      />
    </form>
  )
}


export default UpdateReview