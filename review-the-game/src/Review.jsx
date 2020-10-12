import React, {useState} from "react"
import axios from "axios"
import { baseUrl } from "./constants"
import UpdateReview from "./UpdateReview"


function Review(props) {
  const [deleted, setDeleted] = useState(false)
  const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/reviews`

  const handleDelete = async () => {
    setDeleted(true)
    setTimeout(async () => {
      const airtableUrl = `${baseUrl}/reviews/${props.review.id}`
      await axios.delete(airtableUrl)
      props.fetchReview((prevFetchReviews) => !prevFetchReviews)
      console.log(props.setFetchReviews);
      setDeleted(false)
    }, 1500)
  }


return (
  <div className="review">
    <h3>{props.review.fields.gameTitle}</h3>
    <h4>{props.review.fields.review}</h4>
    <h5>{props.review.fields.author}</h5>
    <button onClick={handleDelete}>{deleted ? "Delete" : "Deleted"}</button>
    <UpdateReview
      review={props.review}
      fetchReviews={props.fetchReviews}
      setFetchReviews={props.setFetchReviews}
    /> 
  </div>
);
}

export default Review