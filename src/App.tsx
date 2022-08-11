import { FC, useEffect, useState } from 'react';
import Filters from './components/Filters';
import TicketsList from './components/TicketsList';
import { AppContext } from './core/context';
import { loadFlights } from './core/helpers';
import { voyage } from './core/types';

const App:FC = () => {
	const [flights, setFlights] = useState<voyage[]>([]);
	const [copyFlights, setCopyFlights] = useState<voyage[]>([]);

	const fetchData = async () => {
		const flying = await loadFlights();
		setFlights(flying);
		setCopyFlights(flying);
	}

	useEffect(() => {
		fetchData();
	}, [])

	const provideValues = {flights, setFlights, copyFlights}

	return (
		<AppContext.Provider value = {provideValues}>
			<header className="header">
				<h1>Поиск перелетов</h1>
			</header>
			{!!flights.length && (
				<main className="main">
					<Filters/>
					<TicketsList/>
				</main>
				)
			}
		</AppContext.Provider>
	);
}

export default App;
