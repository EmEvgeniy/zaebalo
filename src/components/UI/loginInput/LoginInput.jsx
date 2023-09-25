import classes from "./loginInput.module.css";

const LoginInput = ({ type, placeholder, fn, active }) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			onChange={(e) => fn(e.target.value)}
			className={
				active
					? `${classes.LoginInput} ${classes.fail}`
					: `${classes.LoginInput}`
			}
		/>
	);
};

export default LoginInput;
