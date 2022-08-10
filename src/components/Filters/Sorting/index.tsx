import { FC, useContext } from "react";
import { AppContext } from "../../../core/context";
import { onCheckAllFilters } from "../../../core/helpers";


const Sorting:FC = () => {
	const {setFlights, copyFlights} = useContext(AppContext);

	const handlerLabelClick = () => {
		const newFlights = onCheckAllFilters(copyFlights);
		setFlights(newFlights);
	};

	return (
		<fieldset id="filters-sorting" className="filters-sorting filters-block">
			<legend className="filters-sorting-legend filters-block-legend">Сортировать</legend>
			<label onClick={handlerLabelClick} className="filters-sorting-label">
				<input id="1" type="radio" name="sorting"/>
				- по возрастанию цены
			</label>
			<label onClick={handlerLabelClick} className="filters-sorting-label">
				<input id="2" type="radio" name="sorting"/>
				- по убыванию цены
			</label>
			<label onClick={handlerLabelClick} className="filters-sorting-label">
				<input id="3" type="radio" name="sorting"/>
				- по времени в пути
			</label>
		</fieldset>
	)
};

export default Sorting;