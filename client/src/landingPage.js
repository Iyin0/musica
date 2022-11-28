import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from './pageTransition';

const LandingPage = () => {

    const navigate = useNavigate()

    return (
        <PageTransition>
            <motion.div className="auth-page">
                {/* <main> */}
                <p className='landing-text'>Enjoy Playlists from around the world!!!</p>
                <button className='landing-btn' onClick={() => navigate('/login')}>Jump back in</button>
                {/* </main> */}
            </motion.div>
        </PageTransition>
    );
}

export default LandingPage;