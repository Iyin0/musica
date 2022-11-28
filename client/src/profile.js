import './scss/profile.scss';
import { motion } from "framer-motion";
import PageTransition from './pageTransition';
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect, useState } from 'react';

const Profile = () => {
    const { user } = useAuthContext()
    const [fetchingUser, setFetchingUser] = useState(null)
    const [errorUser, setErrorUser] = useState(null)
    const [account, setAccount] = useState(null)

    const getUser = async () => {

        setAccount(false)
        setFetchingUser(true)
        setErrorUser(false)

        const response = await fetch('/api/user', {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setErrorUser(true)
            setFetchingUser(json.error)
        }

        if (response.ok) {
            setAccount(json)
            setFetchingUser(false)
            setErrorUser(false)
        }
    }

    useEffect(() => {
        getUser()
        // eslint-disable-next-line
    }, [])

    return (
        <PageTransition>
            <motion.div className="profile">
                {account && (
                    <h1>Hi, {account.username}</h1>
                )}
                {fetchingUser && (
                    <p>Loading...</p>
                )}
                {errorUser && (
                    <p>{errorUser}</p>
                )}
            </motion.div>
        </PageTransition>
    );
}

export default Profile;