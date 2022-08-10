import { FC, useMemo } from "react";
import { onDefineDate, onDefineDurationTime } from "../../../../../core/helpers";
import { ITravelTimeProps } from "../../../../../core/types";


const TravelTime:FC<ITravelTimeProps> = ( {
	travelSegments, duration, sumTransfers
} ) => {

	const durationTime = useMemo(() => {
		return onDefineDurationTime(duration)
	}, [])

	const depeartureTime = useMemo(() => {
		return onDefineDate(travelSegments[0].departureDate)
	}, [])

	const arrivalTime = useMemo(() => {
		return onDefineDate(travelSegments[sumTransfers].arrivalDate)
	}, [])

	return (
		<div className="travel-time">
			<div className="travel-time-dates">
				<p className="travel-time-dates-departure">
					{depeartureTime[0]} <span className="travel-time-dates-departure-date">{depeartureTime[1]}</span>
				</p>
				<p className="travel-time-dates-duration">
					<span className="material-symbols-outlined">schedule</span>
					<span className="travel-time-dates-duration-text">{durationTime}</span>
				</p>
				<p className="travel-time-dates-arrival">
					<span className="travel-time-dates-arrival-date">{arrivalTime[1]} </span>
					{arrivalTime[0]}
			</p>
			</div>
			{sumTransfers !== 0 
				? (
				<p className="travel-time-transfers">{sumTransfers} пересадка</p>
				) : <hr />
			}
			<p className="travel-time-aircompany">Рейс выполняет: {travelSegments[0].airline?.caption}</p>
		</div>
	)
}

export default TravelTime;