import { voyage } from "../types";

const flightsJSON:string = 'flights.json';

export async function loadFlights(): Promise<voyage[]> {
	const response = await fetch(flightsJSON);
	const obj = await response.json();
	const flightsArr: voyage[] = JSON.parse(JSON.stringify(obj.result.flights));

	const flightsArrWithId = flightsArr.map((item, index) => {
		item.id = index;
		return item
	})

	return flightsArrWithId;
};

export function onDefineDurationTime(duration: number): string {
	const hours = Math.floor(duration / 60);
	const minutes = duration - hours * 60;
	return `${hours} ч ${minutes} мин`;
}

const dayOfWeek:string[] = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
const monthOfYear: string[] = ['янв.', 'февр.', 'март', 'апр.', 'май.', 'июнь.', 'июль.', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.']

export function onDefineDate(fullDateString: string):string[] {
	const date = new Date(fullDateString);

	const hours = date.getHours();
	const minutes = date.getMinutes();

	const dayOfMonth = date.getDate();
	const month = date.getMonth();
	const monthName = monthOfYear[month];

	const day = date.getDay();
	const nameDay = dayOfWeek[day];

	const dateArr = [hours, minutes, dayOfMonth];
	const convDateArr = dateArr.map(item => item < 10 ? `0${item}` : item)

	const dateString = `${convDateArr[2]} ${monthName} ${nameDay}`
	const timeString = `${convDateArr[0]}:${convDateArr[1]}`;
	return [timeString, dateString]
}


export function onCheckAirlinesNames(arrflights: voyage[]): string[] {
	let arrCompaniesNames: string[] = [];

	arrflights.forEach(item => {
		const name = item.flight.carrier.caption;

		if(!arrCompaniesNames.includes(name)) {
			arrCompaniesNames.push(name)
		};
	});

	return arrCompaniesNames;
}

export function onCheckAllFilters(copyArrFlights: voyage[]): voyage[] {
	const flightsSortingFilter = onCheckFilterSorting(copyArrFlights);
	const flightsAirlinesFilter = onCheckFilterAirlines(flightsSortingFilter);

	const flightsPriceFilter = onCheckFilterPrice(flightsAirlinesFilter);
	const flightsTransferFilter = onCheckFilterTransfer(flightsPriceFilter);
	
	return flightsTransferFilter;
}

function onCheckFilterSorting(arrFlights: voyage[]): voyage[] {
	let newArrFlights: voyage[] = JSON.parse(JSON.stringify(arrFlights));
	const fieldsetSorting = document.getElementById('filters-sorting');

	const inputSorting = fieldsetSorting?.querySelector('input:checked');
	const inputId = inputSorting?.id;

	if (inputId === undefined) {
		return newArrFlights
	}

	if (+inputId < 3) {
		newArrFlights.sort((a, b) => {
			return +a.flight.price.total.amount - +b.flight.price.total.amount;
		})

		if (+inputId === 2) newArrFlights.reverse();
		return newArrFlights;

	} else {
		newArrFlights.sort((a, b) => {
			const resultA = a.flight.legs.reduce((sum, leg) => sum + leg.duration, 0);
			const resultB = b.flight.legs.reduce((sum, leg) => sum + leg.duration, 0);
			return resultA - resultB
		});
		return newArrFlights;
	}
}


function onCheckFilterAirlines(arrFlights: voyage[]): voyage[] {
	const oldArrFlights: voyage[] = JSON.parse(JSON.stringify(arrFlights));
	let newArrFlights: voyage[] = [];

	const fieldsetAirlines = document.getElementById("filters-airlines");
	const inputAirlines = fieldsetAirlines?.querySelectorAll('input:checked');

	if (inputAirlines === undefined) {
		return oldArrFlights;

	} else if (!inputAirlines.length) {
		return oldArrFlights;

	} else {
		for (let i = 0; i < inputAirlines.length; i++) {
			const labelText = inputAirlines[0].parentNode?.textContent?.slice(2);

			oldArrFlights.forEach(item => {
				const name = item.flight.carrier.caption;

				if (labelText === name) {
					newArrFlights.push(item)
				}
			})
		}
		return newArrFlights;
	}
}

function onCheckFilterPrice(arrFlights: voyage[]): voyage[] {
	const oldArrFlights: voyage[] = JSON.parse(JSON.stringify(arrFlights));

	const minPriceInput = (<HTMLInputElement>document.getElementById('min-price')).value;
	const minPriceValue = parseInt(minPriceInput || '0');

	const maxPriceInput = (<HTMLInputElement>document.getElementById('max-price')).value;
	const maxPriceValue = parseInt(maxPriceInput || '1000000');

	const newArrFlights = oldArrFlights.filter((item) => (
		minPriceValue <= +item.flight.price.total.amount && +item.flight.price.total.amount <= maxPriceValue))

	return newArrFlights;
}

function onCheckFilterTransfer(arrFlights: voyage[]):voyage[] {
	const oldArrFlights: voyage[] = JSON.parse(JSON.stringify(arrFlights));
	let newArrFlights: voyage[] = [];

	const fieldsetTransfers = document.getElementById("filters-transfers");
	const inputTransfers = fieldsetTransfers?.querySelectorAll('input:checked');

	if (inputTransfers === undefined) {
		return oldArrFlights;

	} else if (inputTransfers.length === 2 || !inputTransfers.length) {
		return oldArrFlights;

	} else {
		const inputId = inputTransfers[0].id;

		if (inputId === 'zero-transfers') {
			newArrFlights = oldArrFlights.filter(item => (
				item.flight.legs[0].segments.length !==2 && item.flight.legs[1].segments.length !== 2))

		} else {
			newArrFlights = oldArrFlights.filter(item => (
				item.flight.legs[0].segments.length ===2 && item.flight.legs[1].segments.length === 2))
		}
		
		return newArrFlights
	}
}
