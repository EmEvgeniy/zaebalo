import Burger from "../../UI/burger/Burger";
import classes from "./header.module.css";
import logo from "../../../assets/logo.webp";
import AlertBell from "../../UI/alertBell/AlertBell";
import UserProfile from "../../UI/userProfile/UserProfile";

const Header = () => {
	return (
		<header className={classes.Header}>
			<Burger />
			<div className={classes.logo}>
				<img src={logo} alt='logo' />
			</div>
			<div className={classes.inner}>
				<AlertBell />
				<UserProfile />
			</div>
		</header>
	);
};

export default Header;
