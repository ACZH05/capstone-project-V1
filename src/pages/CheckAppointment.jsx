import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../components/AuthProvider"
import axios from "axios"
import BookedCard from "../components/BookedCard"

export default function CheckAppointment() {
    const { currentUser } = useContext(AuthContext)
    const id = currentUser?.uid
    const BASE_URL = 'https://booking-api.alfred-chinchin.repl.co'

    const [information, setInformation] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/booking/${id}`)
            .then((result) => {
                setInformation(result.data)
            })
    }, [id, information])
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
