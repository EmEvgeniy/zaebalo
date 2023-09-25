import { useSelector } from "react-redux";
import classes from "./cardEditPhotoComp.module.css";
import { useEffect, useState } from "react";
import LoginBtn from "../../UI/loginBtn/LoginBtn";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";

const CardEditPhotoComp = () => {
	const [active, setActive] = useState(false);
	const [id, setId] = useState(null);
	const [photo, setPhoto] = useState(null);
	const value = useSelector((state) => state.card.value);
	const [data, setData] = useState([]);
	
	async function getProduct() {
		await axios
			.get(`https://api.it-test.uz/v1/products/${value.id}`)
			.then((res) => setData(res.data));
	}
	const handleDelete = async () => {
		if (id) {
			await axios
				.delete(`https://api.it-test.uz/v1/product/photos${id}`)
				.then((res) =>
					res.status == 200 ? getProduct() & setPhoto(null) : null
				);
		}
	};
	const handleSelectFile = () => {
		// Открываем диалог выбора файла
		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*"; // Ограничиваем тип файлов только изображениями

		fileInput.onchange = (event) => {
			const selectedFile = event.target.files[0];
			if (selectedFile) {
				setPhoto(selectedFile);
			}
		};
		fileInput.click();
		setActive(true);
	};

	useEffect(() => {
		getProduct();
	}, []);
	const handlePhotoSubmit = async () => {
		const formData = new FormData();
		formData.append("photos", photo);
		if (photo) {
			await axios
				.post(`https://api.it-test.uz/v1/product/photos/${value.id}`, formData)
				.then((res) =>
					res.status == 200 ? getProduct() & setPhoto(null) : null
				);
		}
	};
	return (
		<div className={classes.CardEditPhotoComp}>
			<div className={classes.photos}>
				{data?.photos?.map((el, index) => (
					<div
						key={index}
						className={
							active && el.id === id
								? `${classes.photos_wrap} ${classes.active}`
								: `${classes.photos_wrap}`
						}
						onMouseOver={() => setActive(true) & setId(el.id)}
						onMouseLeave={() => setActive(false) & setId(null)}>
						<img src={el.photo_url} alt='product_photo' />
						<BsFillTrashFill
							className={
								active && el.id === id
									? `${classes.icon2} ${classes.active}`
									: `${classes.icon2}`
							}
							onClick={() => setId(el.id) & handleDelete()}
						/>
					</div>
				))}
			</div>
			<div className={classes.priview}>
				{photo ? (
					<img src={URL.createObjectURL(photo)} alt='preview' />
				) : (
					<p>Предпросмотр фотографии</p>
				)}
			</div>
			<div className={classes.btns}>
				<LoginBtn title={"загрузить"} fn={handleSelectFile} />
				<span className={classes.back} onClick={() => handlePhotoSubmit()}>
					Сохранить
				</span>
			</div>
		</div>
	);
};

export default CardEditPhotoComp;
