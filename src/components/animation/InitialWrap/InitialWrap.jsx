import { motion } from "framer-motion";

const InitialWrap = ({ children }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1.3, delay: 0.3 }}>
			{children}
		</motion.div>
	);
};

export default InitialWrap;
