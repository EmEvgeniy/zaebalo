import { useEffect, useState } from "react";
import DefInput from "../../UI/DefInput/DefInput";
import classes from "./cardEditInfoCopm.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LoginBtn from "../../UI/loginBtn/LoginBtn";
import { changeCardStatus } from "../../../store/slices/cardSlice";
import { BiSolidArchiveIn } from "react-icons/bi";

const CardEditInfoComp = () => {
	const value = useSelector((state) => state.card.value);
	const [categoriesData, setCategoriesData] = useState([]);
	const [brandData, setBrandData] = useState([]);
	const [roles, setRoles] = useState([]);
	const [data, setData] = useState({});
	const [title, setTitle] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [active, setActive] = useState(false);
	const [description, setDescription] = useState("");
	const [clirence, setClirence] = useState("");
	const [fuel_consumption, setFuel_consumption] = useState("");
	const [fuel_tank_volume, setFuel_tank_volume] = useState("");
	const [engine, setEngine] = useState("");
	const [max_power, setMax_power] = useState("");
	const [max_speed, setMax_speed] = useState("");
	const [main_gear, setMain_gear] = useState("");
	const [back_brake, setBack_brake] = useState("");
	const [back_tires, setBack_tires] = useState("");
	const [front_tires, setFront_tires] = useState("");
	const [front_brake, setFront_brake] = useState("");
	const [weight, setWeight] = useState("");
	const [video_link, setVideo_link] = useState("");
	const [show_on_main_page, setShow_on_main_page] = useState(false);
	const [show_on_see_also, setShow_on_see_also] = useState(false);
	const [brand_id, setBrand_id] = useState(
		brandData?.filter((el) => el.id === data?.brand_id)[0]?.id
	);
	const [sizes, setSizes] = useState("");
	const [ignition_system, setIgnition_system] = useState("");
	const [gearbox, setGearbox] = useState("");
	const [user_id, setUserId] = useState("");
	const [tag, setTag] = useState("");
	const dispatch = useDispatch();
	console.log(active);

	async function getCategories() {
		await axios
			.get(`https://api.it-test.uz/v1/categories`)
			.then((res) => setCategoriesData(res.data));
	}
	async function getProduct() {
		await axios
			.get(`https://api.it-test.uz/v1/products/${value.id}`)
			.then((res) => setData(res.data));
	}
	async function getBrands() {
		await axios
			.get(`https://api.it-test.uz/v1/roles`)
			.then((res) => setBrandData(res.data));
	}
	async function getUsers() {
		await axios
			.get(`https://api.it-test.uz/v1/brands`)
			.then((res) => setRoles(res.data));
	}
	useEffect(() => {
		getProduct();
		getCategories();
		getBrands();
		getUsers();
	}, []);
	const handleSubmit = async () => {
		const formData = {
			title: data.title,
			user_id: user_id || data.user_id,
			description: description || data.description,
			min_quantity: data.min_quantity,
			video_link: video_link || data.video_link,
			status_id: 4,
			weight: weight || data.weight,
			clearance: clirence || data.clearance,
			fuel_tank_volume: fuel_tank_volume || data.fuel_tank_volume,
			fuel_consumption: fuel_consumption || data.fuel_consumption,
			engine: engine || data.engine,
			max_power: max_power || data.max_power,
			max_speed: max_speed || data.max_speed,
			tag: tag || data.tag,
			ignition_system: ignition_system || data.ignition_system,
			main_gear: main_gear || data.main_gear,
			front_brake: front_brake || data.front_brake,
			back_brake: back_brake || data.back_brake,
			front_tires: front_tires || data.front_tires,
			back_tires: back_tires || data.back_tires,
			show_on_main_page: show_on_main_page || data.show_on_main_page,
			show_on_see_also: show_on_see_also || data.show_on_see_also,
			brand_id: Number(brand_id) || data.brand_id,
			sizes: sizes || data.sizes,
			category_id: Number(categoryId) || data.category_id,
			gearbox: gearbox || data.gearbox,
		};
		if (description || data.description) {
			await axios
				.put(`https://api.it-test.uz/v1/products/${value?.id}`, formData)
				.then((res) =>
					res.status == 200 ? getProduct() & setActive(false) : null
				);
		} else {
			setActive(true);
		}
	};

	return (
		<div className={classes.CardEditInfoComp}>
			<DefInput
				title={"Имя товара:"}
				data={data?.title}
				fn={setTitle}
				active={false}
			/>
			<div className={classes.group}>
				<div className={classes.customSelect}>
					<select
						defaultValue={data.category_id}
						className={classes.select}
						onChange={(e) => setCategoryId(e.target.value)}>
						{categoriesData.map((el, index) => (
							<option value={el.id} key={el.id}>
								{el.name}
							</option>
						))}
					</select>
					<div className={classes.selectArrow}></div>
				</div>
				<div className={classes.customSelect}>
					<select
						defaultValue={data.brand_id}
						onChange={(e) => setBrand_id(e.target.value)}
						className={classes.select}>
						{brandData.map((el) => (
							<option value={el.id} key={el.id}>
								{el.name}
							</option>
						))}
					</select>
					<div className={classes.selectArrow}></div>
				</div>
				<div className={classes.customSelect}>
					<select
						onChange={(e) => setUserId(e.target.value)}
						className={classes.select}>
						{roles.map((el) => (
							<option value={el.id} key={el.id}>
								{el.name}
							</option>
						))}
					</select>
					<div className={classes.selectArrow}></div>
				</div>
			</div>
			<div className={classes.group}>
				<DefInput title={""} data={data?.uzb_price} active={false} />
				<DefInput title={""} data={data?.quantity} active={false} />
			</div>
			<textarea
				className={
					active
						? `${classes.textarea} ${classes.active}`
						: `${classes.textarea}`
				}
				defaultValue={data?.description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div className={classes.group2}>
				<DefInput
					title={"Вес:"}
					fn={setWeight}
					data={data.weight}
					active={true}
				/>
				<DefInput
					title={"Клиренс:"}
					fn={setClirence}
					data={data.clearance}
					active={true}
				/>
				<DefInput
					title={"Объем топливного бака:"}
					fn={setFuel_tank_volume}
					data={data.fuel_tank_volume}
					active={true}
				/>
				<DefInput
					title={"Расход топлива:"}
					fn={setFuel_consumption}
					data={data?.fuel_consumption}
					active={true}
				/>
				<DefInput
					title={"Двигатель:"}
					fn={setEngine}
					data={data?.engine}
					active={true}
				/>
				<DefInput
					title={"Максимальная мощность:"}
					fn={setMax_power}
					data={data?.max_power}
					active={true}
				/>
				<DefInput
					title={"Максимальная скорость:"}
					fn={setMax_speed}
					data={data?.max_speed}
					active={true}
				/>
				<DefInput
					title={"Система зажигания:"}
					fn={setIgnition_system}
					data={data?.ignition_system}
					active={true}
				/>
				<DefInput
					title={"Коробка передач:"}
					fn={setGearbox}
					data={data?.gearbox}
					active={true}
				/>
				<DefInput
					title={"Главная передача:"}
					fn={setMain_gear}
					data={data?.main_gear}
					active={true}
				/>
				<DefInput
					title={"Тормоз передний:"}
					fn={setFront_brake}
					data={data?.front_brake}
					active={true}
				/>
				<DefInput
					title={"Тормоз задний:"}
					fn={setBack_brake}
					data={data?.back_brake}
					active={true}
				/>
				<DefInput
					title={"Шины передние:"}
					fn={setFront_tires}
					data={data?.front_tires}
					active={true}
				/>
				<DefInput
					title={"Шины задние:"}
					fn={setBack_tires}
					data={data?.back_tires}
					active={true}
				/>
				<DefInput
					title={"ДхШхВ:"}
					fn={setSizes}
					data={data?.sizes}
					active={true}
				/>
				<DefInput
					title={"Маркировка:"}
					fn={setTag}
					data={data?.tag}
					active={true}
				/>
			</div>
			<DefInput
				title={"Видео:"}
				data={data?.video_link}
				fn={setVideo_link}
				active={true}
			/>
			<div className={classes.pages}>
				<div className={classes.item}>
					<span>Показать товар на “главной”</span>
					<input
						type='checkbox'
						defaultChecked={data?.show_on_main_page}
						onClick={() => setShow_on_main_page(!show_on_main_page)}
					/>
				</div>
				<div className={classes.item}>
					<span>Показать товар на “смотрите так же”</span>
					<input
						type='checkbox'
						defaultChecked={data?.show_on_see_also}
						onClick={() => setShow_on_see_also(!show_on_see_also)}
					/>
				</div>
			</div>
			<div className={classes.btns}>
				<LoginBtn title={"Сохранить"} fn={handleSubmit} />

				<span
					className={classes.back}
					onClick={() => dispatch(changeCardStatus(false))}>
					Назад
				</span>
				<span className={classes.icon}>
					<BiSolidArchiveIn />
				</span>
			</div>
		</div>
	);
};

export default CardEditInfoComp;
