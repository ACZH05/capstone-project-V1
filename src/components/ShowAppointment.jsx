import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import { Spinner } from "react-bootstrap";
import BookCard from "./BookCard";

export default function ShowAppointment() {
  const [information, setInformation] = useState([])
  const [loading, setLoading] = useState(false)


  
  const { currentUser } = useContext(AuthContext)
  const id = currentUser?.uid
  const BASE_URL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    setLoading(true)
    axios.get(`${BASE_URL}/appointment`)
      .then((result) => {
        setInformation(result.data)
      })
    setLoading(false)
  }, [BASE_URL, id, information])

  return (
    <div className="d-md-flex gap-5 justify-content-center">
      {loading ? <Spinner animation="border" /> : (

        <>
        {information.map((info, index) => (
          <div key={index} className="mt-4">
              <BookCard info={info} />
          </div>
        ))}
        </>
      )}
    </div>
  )
}
