import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";
import { storage } from "../firebase";

export default function EditProfileModal({ show, handleClose, information }) {
    const { username, phonenumber: phoneNumber, profilepic: profilePic, roles } = information
    const [newUsername, setNewUsername] = useState(username)
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber)
    const [newProfilePic, setNewProfilePic] = useState(profilePic)

    useEffect(() => {
        setNewUsername(username)
        setNewPhoneNumber(phoneNumber)
    }, [username, phoneNumber])

    const { currentUser } = useContext(AuthContext)
    const id = currentUser?.uid
    
    const BASE_URL = import.meta.env.VITE_BASE_URL

    const handleClick = async () => {
        try {
            let newImageUrl
            if (newProfilePic) {
                const imageRef = ref(storage, `profilePictures/${newProfilePic}`)
                const res = await uploadBytes(imageRef, newProfilePic)
                newImageUrl = await getDownloadURL(res.ref)
            }

            const data = {
                username: newUsername,
                phonenumber: newPhoneNumber,
                profilepic: newImageUrl || profilePic,
                roles
              }

            await axios.put(`${BASE_URL}/users/${id}`, data)
            handleClose()
        }
        catch (error) {
            console.log(error)
        }
    }
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>Edit Profile</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={newUsername} style={{ width: "100%"}} placeholder="Enter username" onChange={(e) => setNewUsername(e.target.value)} required />

                    <Form.Label className="mt-3">Phone Number</Form.Label>
                    <Form.Control type="text" value={newPhoneNumber} style={{ width: "100%"}} placeholder="Exp: 0123456789" onChange={(e) => setNewPhoneNumber(e.target.value)} required />

                    <Form.Label className="mt-3">Profile Picture (Optional)</Form.Label>
                    <Form.Control type="file" style={{ width: "100%"}} onChange={(e) => setNewProfilePic(e.target.files[0])} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" className="rounded-pill" onClick={handleClick}>Edit</Button>
            </Modal.Footer>
    </Modal>
  )
}
