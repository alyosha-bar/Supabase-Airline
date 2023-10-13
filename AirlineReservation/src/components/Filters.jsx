import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";


const Filters = () => {

    const [airlines, setAirlines] = useState();

    useEffect( () => {

        const getAirlines = async () => {
            const [data, error] = await supabase
            .from("flights")
            .select("airline")
            
            if(data) {
                setAirlines(data)
                console.log(airlines)
            }
        }

        getAirlines();

    }, [])

    return ( 
        <div className="filters">
            <h2 className='filters-title'> Filters </h2>
            <ul className='filters-list'>
                <li className='filter'> Airline: <input className="filter-input" type="text" /> </li>
                <li className='filter'> Price: <input className="filter-input" type="range" min="0" max="9999" /> </li>
                <li className='filter'> Deprature: <input className="filter-input" type="date" /></li>
                <li className='filter'> Arrival <input className="filter-input" type="date" /></li>
                <li className='filter'></li>
                <li className='filter'></li>
            </ul>
        </div>
     );
}
 
export default Filters;