import { useState } from 'react';
import { Link } from 'react-router-dom';
import './scss/auth.scss'
import { useSignup } from './hooks/useSignup';
import { motion } from 'framer-motion';
import PageTransition from './pageTransition';

const Signup = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleClick = async (e) => {
        e.preventDefault()

        await signup(username, email, password)
    }

    return (
        <PageTransition>
            <motion.div className="auth-page">
                {/* <main> */}
                <div className='auth-card'>
                    <h1>Welcome! Sign up and start listening</h1>
                    <form action="" onSubmit={handleClick}>
                        <label htmlFor="">username</label> <br />
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                        <label htmlFor="">email</label> <br />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                        <label htmlFor="">password</label> <br />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                        <p>Already have an account? <Link to='/login'>Sign in</Link></p>
                        <div>
                            <button disabled={isLoading}>Sign up</button>
                        </div>
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
                {/* </main> */}
            </motion.div>
        </PageTransition>
    );
}

export default Signup;