import './scss/profile.scss';
import { motion } from "framer-motion";
import PageTransition from './pageTransition';

const Profile = () => {
    return (
        <PageTransition>
            <motion.div className="profile">
                <h1>PROFILE</h1>
            </motion.div>
        </PageTransition>
    );
}

export default Profile;