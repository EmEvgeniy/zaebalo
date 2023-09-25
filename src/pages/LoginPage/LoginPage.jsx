import { AnimatePresence } from "framer-motion";
import classes from "./loginPage.module.css";
import { InitialWrap, LoginBtn, LoginInput, Logo } from "../../components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [active, setActive] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("username", email);
		formData.append("password", pass);
		if (email && pass) {
			await axios
				.post("https://api.it-test.uz/v1/users/login", formData)
				.then((res) => sessionStorage.setItem("token", res?.data?.access_token))
				.then(() =>
					sessionStorage.getItem("token")
						? navigate("/dashboard")
						: setActive(true)
				)
				.catch(() => setActive(true));
		}
	};
	return (
		<AnimatePresence>
			<InitialWrap>
				<div className={classes.LoginPage}>
					<div className={classes.inner}>
						<Logo />
						<form className={classes.form}>
							<LoginInput
								type={"email"}
								placeholder={"Ваш e-mail"}
								fn={setEmail}
								active={active}
							/>
							<LoginInput
								type={"password"}
								placeholder={"Ваш пароль"}
								fn={setPass}
								active={active}
							/>
							<LoginBtn title={"Войти"} fn={handleSubmit} />
						</form>
					</div>
				</div>
			</InitialWrap>
		</AnimatePresence>
	);
};

export default LoginPage;
