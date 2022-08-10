import { FC, useContext, useMemo, useState } from "react";
import { AppContext } from "../../core/context";
import { voyage } from "../../core/types";
import TicketItem from "./TicketItem";

const TicketsList:FC = () => {
	const {flights} = useContext(AppContext);
	const [amountItems, setAmountItems] = useState(2)

	const onDisplayFlights = () => {
		const displayedFlights:voyage[] = JSON.parse(JSON.stringify(flights));
		displayedFlights.splice(amountItems, flights.length - 1 - 1);
		return displayedFlights
	}

	const newFlights = useMemo(() => {
		return onDisplayFlights()
	}, [flights, amountItems])

	const onShowMoreFlights = () => {
		setAmountItems(prev => prev +2);
	}

	return(
		<div className="tickets-list">
			{newFlights.map(item => <TicketItem key={item.id} travel={item}/>)}
			<button onClick={onShowMoreFlights} className="tickets-list-btn">Показать еще</button>
		</div>
	)
}

export default TicketsList