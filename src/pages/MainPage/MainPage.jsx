import { AnimatePresence } from "framer-motion";
import { Aside, Header, InitialWrap } from "../../components";
import classes from "./mainPage.module.css";
import { Outlet } from "react-router-dom";

const MainPage = () => {
	return (
		<AnimatePresence>
			<InitialWrap>
				<div className={classes.MainPage}>
					<div className='container'>
						<div className={classes.inner}>
							<Header />
							<div className={classes.content}>
								<Aside />
								<div className={classes.content_inner}>
									<Outlet/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</InitialWrap>
		</AnimatePresence>
	);
};

export default MainPage;
