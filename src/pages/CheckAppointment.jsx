import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../components/AuthProvider"
import axios from "axios"
import BookedCard from "../components/BookedCard"

export default function CheckAppointment() {
    const { currentUser } = useContext(AuthContext)
    const id = currentUser?.uid
    const BASE_URL = import.meta.env.VITE_BASE_URL

    const [information, setInformation] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/booking/${id}`)
            .then((result) => {
                setInformation(result.data)
            })
    }, [id, information, BASE_URL])
  return (
    <div className="d-md-flex gap-5 justify-content-center">
        <>
        {information.map((info, index) => (
          <div key={index} className="mt-4">
              <BookedCard info={info} />
          </div>
        ))}
        </>
    </div>
  )
}
