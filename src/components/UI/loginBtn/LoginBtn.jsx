import classes from "./loginBtn.module.css";

const LoginBtn = ({ title, fn }) => {
	return (
		<span className={classes.LoginBtn} onClick={fn}>
			{title}
		</span>
	);
};

export default LoginBtn;
