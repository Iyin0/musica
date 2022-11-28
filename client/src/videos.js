import './scss/videos.scss';
import { motion } from "framer-motion";
import PageTransition from './pageTransition';

const Videos = () => {
    return (
        <PageTransition>
            <motion.div className="videos">
                <h1>Videos Coming Soon!!!</h1>
            </motion.div>
        </PageTransition>
    );
}

export default Videos;