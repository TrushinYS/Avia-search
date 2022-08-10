import { FC } from "react";
import { ITicketItemProps } from "../../../core/types";
import TravelLeg from "./TravelLeg";


const TicketItem:FC<ITicketItemProps> = ( {travel} ) => {

	return (
		<article className="ticket-item">
			<p className="ticket-item-price">Стоимость для одного взрослого пассажира: {travel.flight.price.total.amount} {travel.flight.price.total.currency}</p>
			{travel.flight.legs.map((item, index) => <TravelLeg key = {travel.id + `${index}`} travelLeg = {item} index = {index}/>)
			}
			<button className="ticket-item-btn">Выбрать</button>
		</article>
	)
}

export default TicketItem;