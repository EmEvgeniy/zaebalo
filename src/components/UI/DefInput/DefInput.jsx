import classes from "./defInput.module.css";

const DefInput = ({ data, fn, title, active }) => {
	return (
		<div className={classes.DefInput}>
			{title && <span className={classes.label}>{title}</span>}
			<input
				type='text'
				className={classes.input}
				defaultValue={data}
				disabled={!active ? true : false}
				onChange={(e) => fn(e.target.value)}
			/>
		</div>
	);
};

export default DefInput;
