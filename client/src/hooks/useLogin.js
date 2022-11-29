import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        // const response = await fetch('/api/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password })
        // })

        // const json = await response.json()

        // if (!response.ok) {
        //     setIsLoading(false)
        //     setError(json.error)
        // }

        // if (response.ok) {
        // //  save the user to local storage
        // localStorage.setItem('user', JSON.stringify(json))

        // //  update the AuthContext
        // dispatch({ type: 'LOGIN', payload: json })
        // setIsLoading(false)
        //     navigate('/welcome')
        // }

        await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                const { error } = data
                if (error) {
                    setError(error)
                    setIsLoading(false)
                }
                else {
                    //  save the user to local storage
                    localStorage.setItem('user', JSON.stringify(data))

                    //  update the AuthContext
                    dispatch({ type: 'LOGIN', payload: data })
                    setIsLoading(false)
                    navigate('/welcome')
                }
            })
    }

    return { login, isLoading, error }
}