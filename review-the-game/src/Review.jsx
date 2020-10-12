import React, {useState} from "react"
import axios from "axios"
import { baseUrl } from "./constants"


function Review(props) {
  const [deleted, setDeleted] = useState(false)

  const handleDelete = async () => {
    setDeleted(true)
    setTimeout(async () => {
      const airtableUrl = `${baseUrl}/reviews/${props.review.id}`
      await axios.delete(airtableUrl)
      props.fetchReview((prevFetchReviews => !prevFetchReviews))
      setDeleted(false)
    }, 1500)
  }


return (
  <div className="review">
    <h3>{props.review.fields.title}</h3>
    <h4>{props.review.fields.text}</h4>
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