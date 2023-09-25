import {motion} from 'framer-motion'

const InnerWrap = ({children}) => {
	return (
		<motion.div
		initial={{opacity:0,scale:0}}
		animate={{opacity:1,scale:1}}
		transition={{delay: .5,duration: 0.3}}
		>{children}</motion.div>
	)
}

export default InnerWrap