import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/auth.scss'
import { useLogin } from './hooks/useLogin';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { login, isLoadinig, error } = useLogin()
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()

        await login(email, password)
    }


    return (
        <div className="auth-page">
            <nav className='auth-nav'>
                <div onClick={() => navigate('/')}>
                    <img src={require('./images/logo.png')} alt="" />
                    <h1>Musica</h1>
                </div>
                <div>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Sign up</Link>
                </div>
            </nav>
            <main>
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
            </main>
        </div>
    );
}

export default Login;