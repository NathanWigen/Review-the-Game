import React, { useState } from "react"
import axios from "axios"
import { baseUrl, config } from "./constants"

function Delete(props) {
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
    <button disabled={deleted} onClick={handleDelete}>{deleted ? "Deleted" : "Delete"}</button>
  )
}

export default Delete