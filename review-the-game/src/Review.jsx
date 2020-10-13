import React, { useState } from "react"
import axios from "axios"
import { baseUrl, config } from "./constants"
import UpdateReview from "./UpdateReview"


function Review(props) {
  const [deleted, setDeleted] = useState(false)
  
  const handleDelete = async () => {
    setDeleted(true)
    setTimeout(async () => {
      const airtableUrl = `${baseUrl}/${props.review.id}`
      await axios.delete(airtableUrl, config)
      props.setFetchReviews((prevFetchReviews) => !prevFetchReviews)
      setDeleted(false)
    }, 1500)
  }


return (
  <div className="review">
    <h3>{props.review.fields.gameTitle}</h3>
    <h4>{props.review.fields.review}</h4>
    <h5>{props.review.fields.author}</h5>
    <button disabled={deleted} onClick={handleDelete}>{deleted ? "Deleted" : "Delete"}</button>
    <UpdateReview
      review={props.review}
      fetchReviews={props.fetchReviews}
      setFetchReviews={props.setFetchReviews}
    /> 
  </div>
);
}

export default Review