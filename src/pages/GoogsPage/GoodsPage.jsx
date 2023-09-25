import { useEffect, useState } from "react";
import {
	Card,
	CardEditComp,
	FilterProductCount,
	GoodsSearch,
} from "../../components";
import classes from "./goodsPage.module.css";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const GoodsPage = () => {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [newsPerPage] = useState(3);
	const status = useSelector((state) => state.card.status);
	const handleChangePage = (event, newPage) => {
		setCurrentPage(newPage);
	};

	const getData = async (currentPage) => {
		await axios
			.get(
				`https://api.it-test.uz/v1/products?page=${currentPage}&page_size=50`
			)
			.then((res) => setData(res.data));
	};

	useEffect(() => {
		getData(currentPage);
	}, [currentPage]);
	return (
		<div className={classes.GoodsPage}>
			{status ? (
				<CardEditComp />
			) : (
				<div className={classes.inner}>
					<div className={classes.inner_header}>
						<GoodsSearch />
						<FilterProductCount />
					</div>
					<div className={classes.content}>
						{data?.items?.map((el, index) => (
							<Card key={index} data={el} />
						))}
					</div>
					<Pagination
						count={data?.pages}
						sx={{ my: "30px" }}
						page={currentPage}
						color='error'
						onChange={handleChangePage}
					/>
				</div>
			)}
		</div>
	);
};

export default GoodsPage;
