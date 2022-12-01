import './scss/profile.scss';
import { motion } from "framer-motion";
import PageTransition from './pageTransition';
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect, useState } from 'react';
import Loading from './loading';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/playlistData';

const Profile = () => {
    const { user } = useAuthContext()
    const [fetchingUser, setFetchingUser] = useState(null)
    const [errorUser, setErrorUser] = useState(null)
    const dispatch = useDispatch();
    const account = useSelector((state) => state.displayPlaylistData.user)

    const getUser = async () => {

        if (!account) {
            setFetchingUser(true)
            setErrorUser(false)
        }

        try {
            const response = await fetch('https://musica-by-iyin-api.onrender.com/api/user', {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if (!response.ok) {
                setErrorUser(json.error)
                setFetchingUser(false)
            }

            if (response.ok) {
                dispatch(setUser(json))
                console.log(json)
                setFetchingUser(false)
                setErrorUser(false)
            }
        } catch (error) {
            setErrorUser(error.message)
            setFetchingUser(false)
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
                    <motion.div className="fetching-error">
                        <h1>Hi, {account.username}</h1>
                    </motion.div>
                )}
                {fetchingUser && (
                    <motion.div className="fetching-error">
                        <Loading />
                    </motion.div>
                )}
                {errorUser && (
                    <motion.div className="fetching-error">
                        <p>{errorUser}</p>
                        <button onClick={() => getUser()}>Try Again</button>
                    </motion.div>
                )}
            </motion.div>
        </PageTransition>
    );
}

export default Profile;