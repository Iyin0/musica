import { Link, useNavigate } from 'react-router-dom';
import './scss/auth.scss'

const Navbar = () => {
    const navigate = useNavigate()

    return (
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
    );
}

export default Navbar;