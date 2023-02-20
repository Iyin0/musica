import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const signup = async (username, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://musica-by-iyin-api.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            //  save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //  update the AuthContext
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)
            navigate('/home')
        }
    }

    return { signup, isLoading, error }
}