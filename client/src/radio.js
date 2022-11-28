import './scss/radio.scss';
import { motion } from "framer-motion";
import PageTransition from './pageTransition';

const Radio = () => {
    return (
        <PageTransition>
            <motion.div className="radio">
                <h1>Radio Coming Soon!!!</h1>
            </motion.div>
        </PageTransition>
    );
}

export default Radio;