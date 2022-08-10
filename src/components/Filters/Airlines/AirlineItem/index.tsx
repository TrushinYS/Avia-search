import { FC, useContext } from "react";
import { AppContext } from "../../../../core/context";
import { onCheckAllFilters } from "../../../../core/helpers";
import { IAirlineItemProps } from "../../../../core/types";


const AirlineItem:FC<IAirlineItemProps> = ( {airlineName} ) => {
	const {setFlights, copyFlights} = useContext(AppContext);

	const handlerLabelClick = () => {
		const newFlights = onCheckAllFilters(copyFlights);
		setFlights(newFlights);
	};

	return (
		<label onClick={handlerLabelClick} className="filters-airlines-label">
			<input type="checkbox" name="airlines"/>
			- {airlineName}
		</label>
	)
}

export default AirlineItem