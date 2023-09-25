import { AnimatePresence } from "framer-motion";
import classes from "./cardEditComp.module.css";
import InnerWrap from "../animation/InnerWrap/InnerWrap";
import CardEditPhotoComp from "./cardEditPhotoComp/CardEditPhotoComp";
import CardEditInfoComp from "./cardEditInfoComp/CardEditInfoComp";

const CardEditComp = () => {
	return (
		<AnimatePresence>
			<InnerWrap>
				<div className={classes.CardEditComp}>
					<CardEditPhotoComp/>
					<CardEditInfoComp/>
				</div>
			</InnerWrap>
		</AnimatePresence>
	);
};

export default CardEditComp;
