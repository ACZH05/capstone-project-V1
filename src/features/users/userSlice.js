import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const BASE_URL = 'https://booking-api.alfred-chinchin.repl.co'
const auth = getAuth()

export const signUp = createAsyncThunk(
    "user/signUp",
    async (obj) => {
        const email = obj.email
        const password = obj.password
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const id = res.user.uid
        const apiRes = await axios.post(`${BASE_URL}/signup`, {id, email})
        return apiRes.json()
    }
)

const userSlice = createSlice({
    name: "users",
    initialState: { users: []},
    reducers: [],
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.users = [action.payload, ...state.name]
        })
    }
})

export default userSlice.reducer