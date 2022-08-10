import { ChangeEvent, FC, useCallback, useContext, useState, useTransition } from "react";
import { AppContext } from "../../../core/context";
import { onCheckAllFilters } from "../../../core/helpers";


const Price:FC = () => {
	const {setFlights, copyFlights} = useContext(AppContext);
	const [isPending, startTransition] = useTransition();

	const [price, setPrice] = useState('');

	const filterPriceFlights = useCallback(() => {
		const newFlights = onCheckAllFilters(copyFlights)
		return setFlights(newFlights)
	}, [price])

	const handlerPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
		startTransition(() => {
			setPrice(e.target.value)
			filterPriceFlights()
		})
	}

	const handlerButtonClick = () => {
		const newFlights = onCheckAllFilters(copyFlights);
		setFlights(newFlights);
	}

	return (
		<fieldset className="filters-price filters-block">
			<legend className="filters-price-legend filters-block-legend">Цена</legend>
			<label className="filters-price-label">
				От <input id="min-price" type="number" onChange={handlerPriceChange} min={0}/>
			</label>
			<label className="filters-price-label">
				До <input id="max-price" type="number" onChange={handlerPriceChange} min={0}/>
			</label>
			<button onClick={handlerButtonClick} className="filters-price-btn">Применить</button>
		</fieldset>
	)
};

export default Price;