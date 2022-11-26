import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate()

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
                <p className='landing-text'>Enjoy Playlists from around the world!!!</p>
                <button className='landing-btn' onClick={() => navigate('/login')}>Jump back in</button>
            </main>
        </div>
    );
}

export default LandingPage;