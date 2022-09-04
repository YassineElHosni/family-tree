import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import useAuth from "../../contexts/auth-context"

export default function Signup() {
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div id="email">
                    <label>Email</label>
                    <input type="email" ref={emailRef} required />
                </div>
                <div id="password">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} required />
                </div>
                <div id="password-confirm">
                    <label>Password Confirmation</label>
                    <input type="password" ref={passwordConfirmRef} required />
                </div>
                <button disabled={loading} className="w-100" type="submit">
                    Sign Up
                </button>
            </form>

            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}
