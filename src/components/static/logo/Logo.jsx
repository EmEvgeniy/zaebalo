import classes from './logo.module.css'
import logo from '../../../assets/logo.webp'

const Logo = () => {
	return (
		<div className={classes.Logo}>
			<img src={logo} alt='logo' />
		</div>
	)
}

export default Logo