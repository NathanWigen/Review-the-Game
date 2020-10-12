import React, {useState} from "react"
import axios from "axios"

function UpdateReview(props) {
  const [gameTitle, setgameTitle] = useState(props.review.fields.gameTitle)
  const [review, setReview] = useState(props.review.fields.review)
  const [author, setAuthor] = useState(props.review.fields.author)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fields = {
      gameTitle,
      review,
      author
    }
    const airtableUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/reviews/${props.review.id}`
    await axios.put(
      airtableUrl,
      { fields },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      }
    )
    props.FetchReviews(!props.fetchReviews)
  }

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <label htmlFor="Game Title">Game Title:</label>
      <input
        name="Game Title"
        type="text"
        placeholder="Game Title"
        value={gameTitle}
        onchange={(e)=> setgameTitle(e.target.value)}
      />
      <label htmlFor="review">Review:</label>
      <input
        name="review"
        type="text"
        placeholder="review"
        value={review}
        onchange={(e)=> setReview(e.target.value)}
      />
      <label htmlFor="author">Author:</label>
      <input
        name="author"
        type="text"
        placeholder="your name"
        value={author}
        onchange={(e)=> setAuthor(e.target.value)}
      />
      <button type="submit">Submit Review</button>
    </form>
  )
}


export default UpdateReview