import React from "react"
import UpdateReview from "./UpdateReview"
import Delete from "./Delete"


function Review(props) {

return (
  <div className="review">
    <h3>{props.review.fields.gameTitle}</h3>
    <h4>{props.review.fields.review}</h4>
    <h5>{props.review.fields.author}</h5>
    <Delete
      review={props.review}
      fetchReviews={props.fetchReviews}
      setFetchReviews={props.setFetchReviews}/>
    <UpdateReview className="update-form"
      review={props.review}
      fetchReviews={props.fetchReviews}
      setFetchReviews={props.setFetchReviews}
    /> 
  </div>
);
}

export default Review