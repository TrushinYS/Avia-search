import { FC, useContext } from "react";
import { AppContext } from "../../../core/context";
import { onCheckAllFilters } from "../../../core/helpers";


const Transfers:FC = () => {
	const {setFlights, copyFlights} = useContext(AppContext);

	const handlerLabelClick = () => {
		const newFlights = onCheckAllFilters(copyFlights);
		setFlights(newFlights);
	}

	return(
		<fieldset id="filters-transfers" className="filters-transfers filters-block">
			<legend className="filters-transfers-legend filters-block-legend">Фильтровать</legend>
			<label onClick={handlerLabelClick} className="filters-transfers-label">
				<input id="one-transfers"  type="checkbox" name="transfers"/>
				- 1 пересадка
			</label>
			<label onClick={handlerLabelClick} className="filters-transfers-label">
				<input id="zero-transfers"  type="checkbox" name="transfers"/>
				- без пересадок
			</label>
		</fieldset>
	)
}

export default Transfers