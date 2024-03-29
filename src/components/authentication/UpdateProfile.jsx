import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import useAuth from "../../contexts/auth-context"

export default function UpdateProfile() {
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                navigate("/user")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <div>
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <div>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div id="email">
                        <label>Email</label>
                        <input type="email" ref={emailRef} required defaultValue={currentUser.email} />
                    </div>
                    <div id="password">
                        <label>Password</label>
                        <input type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
                    </div>
                    <div id="password-confirm">
                        <label>Password Confirmation</label>
                        <input type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                    </div>
                    <button disabled={loading} className="w-100" type="submit">
                        Update
                    </button>
                </form>
            </div>
            <div className="w-100 text-center mt-2">
                <Link to="/user">Cancel</Link>
            </div>
        </>
    )
}
