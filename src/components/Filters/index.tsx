import { FC } from "react"
import Airlines from "./Airlines";
import Price from "./Price";
import Sorting from "./Sorting";
import Transfers from "./Transfers";


const Filters:FC = () => {

	return(
		<aside className='filters'>
			<Sorting/>
			<Transfers/>
			<Price/>
			<Airlines/>
		</aside>
	)
}

export default Filters;