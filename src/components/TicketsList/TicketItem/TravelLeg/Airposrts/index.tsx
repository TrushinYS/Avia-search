import { FC } from "react";
import { IAirportsProps } from "../../../../../core/types";


const Airports:FC<IAirportsProps> = ( {travelSegments, sumTransfers} ) => {
		
	return (
		<div className="airports">
			<span className="airports-departure">{travelSegments[0]?.departureCity?.caption ? `${travelSegments[0]?.departureCity.caption}, ` : ''}{travelSegments[0]?.departureAirport?.caption}</span>
			<span className="airports-departure-uid">({travelSegments[0].departureAirport?.uid})</span>
			<span className="airports-arrow"> → </span>
			<span className="airports-arrival">{travelSegments[sumTransfers]?.arrivalCity?.caption ? `${travelSegments[sumTransfers]?.arrivalCity?.caption}, ` : ''}{travelSegments[sumTransfers]?.arrivalAirport?.caption}</span>
			<span className="airports-arrival-uid">({travelSegments[sumTransfers]?.arrivalAirport?.uid})</span>
		</div>
	)
}

export default Airports