import { FC } from "react";
import { ITravelLegProps } from "../../../../core/types";
import Airports from "./Airposrts";
import TravelTime from "./TravelTime";


const TravelLeg:FC<ITravelLegProps> = ( {travelLeg, index} ) => {
	const sumTransfers = travelLeg.segments.length - 1;

	return(
		<div className = {index % 2 === 0 ? "travel-leg first-leg" : "travel-leg"}>
			<Airports travelSegments={travelLeg.segments} sumTransfers = {sumTransfers}/>
			<hr />
			<TravelTime travelSegments={travelLeg.segments} duration = {travelLeg.duration} sumTransfers = {sumTransfers}/>
		</div>
	)
}

export default TravelLeg;
