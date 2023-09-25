import { useEffect, useRef, useState } from "react";
import classes from "./goodsSearch.module.css";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
	changeCardStatus,
	getCardValue,
} from "../../../store/slices/cardSlice";

const GoodsSearch = () => {
	const [data, setData] = useState([]);
	const [active, setActive] = useState(false);
	const [item, setItem] = useState("");
	const disatch = useDispatch();
	const refRoot = useRef(null);
	const handleClickOutside = (e) => {
		if (refRoot.current && !refRoot.current.contains(e.target)) {
			setActive(false);
		}
	};
	useEffect(() => {
		const getData = async () => {
			await axios
				.get(`https://api.it-test.uz/v1/products?title=${item}`)
				.then((res) => setData(res.data));
		};
		getData();
	}, [item]);
	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div className={classes.GoodsFilter}>
			<div
				className={classes.GoodsFilter_wrap}
				ref={refRoot}
				onClick={() => setActive(true)}>
				<input
					type='text'
					placeholder='Искать по названию товара'
					onChange={(e) => setItem(e.target.value)}
				/>
				<BiSearch className={classes.icon} />
			</div>
			<div
				className={
					active ? `${classes.list} ${classes.active}` : `${classes.list}`
				}>
				{data?.items?.map((el, index) => (
					<p
						key={index}
						onClick={() =>
							disatch(changeCardStatus(true)) & disatch(getCardValue(el))
						}>
						{el.title}
					</p>
				))}
			</div>
		</div>
	);
};

export default GoodsSearch;
