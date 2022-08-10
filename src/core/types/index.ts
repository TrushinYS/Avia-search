
interface segment {
	airline: {
		caption: string,
	},
	arrivalAirport: {
		uid: string,
		caption: string
	},
	arrivalCity: {
		caption: string
	},
	arrivalDate: string,
	departureAirport: {
		uid: string,
		caption: string,
	},
	departureCity: {
		caption: string
	},
	departureDate: string
}

export interface leg {
	duration: number,
	segments: segment[],
}

export interface voyage {
	flight: {
		carrier: {
			caption: string,
		},
		legs: leg[],
		price: {
			total: {
				amount: string,
				currency: string
			}
		}
	},
	flightToken: string,
	id: number,
}

export interface IAppContext {
	flights: voyage[],
	setFlights: (state: voyage[]) => void,
	copyFlights: voyage[],
}

export interface IAirlineItemProps {
	airlineName: string,
}

export interface ITicketItemProps {
	travel: voyage,
}

export interface ITravelLegProps {
	travelLeg: leg,
	index: number,
}

export interface IAirportsProps {
	travelSegments: segment[];
	sumTransfers: number,
}

export interface ITravelTimeProps extends IAirportsProps {
	duration: number
}