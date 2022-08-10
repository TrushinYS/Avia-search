import { FC, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../core/context";
import { onCheckAirlinesNames } from "../../../core/helpers";
import AirlineItem from "./AirlineItem";

const Airlines:FC = () => {
	const {flights} = useContext(AppContext);
	const [airlinesNames, setAirlinesNames] = useState<string[]>([])

	useEffect(() => {
		const airCompaniesNames: string[] = onCheckAirlinesNames(flights);
		setAirlinesNames(airCompaniesNames);
	}, [])

	return (
		<fieldset id = "filters-airlines" className="filters-airlines filters-block">
			<legend className="filters-airlines-legend filters-block-legend">Авиакомпании</legend>
			{airlinesNames.map(item => <AirlineItem key={item} airlineName ={item}/>)}
		</fieldset>
	)
}

export default Airlines;