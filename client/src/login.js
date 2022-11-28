import { useState } from 'react';
import { Link } from 'react-router-dom';
import './scss/auth.scss'
import { useLogin } from './hooks/useLogin';
import { motion } from 'framer-motion';
import PageTransition from './pageTransition';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { login, isLoadinig, error } = useLogin()

    const handleClick = async (e) => {
        e.preventDefault()

        await login(email, password)
    }


    return (
        <PageTransition>
            <motion.div className="auth-page">
                <div className='auth-card'>
                    <h1>Welcome! Login to start listening</h1>
                    <form action="" onSubmit={handleClick}>
                        <label htmlFor="">email</label> <br />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                        <label htmlFor="">password</label> <br />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                        <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                        <div>
                            <button disabled={isLoadinig}>Login</button>
                        </div>
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
            </motion.div>
        </PageTransition>
    );
}

export default Login;