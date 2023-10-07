import { useEffect, useState } from 'react'
import './App.css'
import supabase from './config/supabaseClient'

import FlightCard from './components/flightCard';
import NavBar from './components/NavBar';

function App() {

  const [error, setError] = useState(null);
  const [flights, setFlights] = useState(null);


  useEffect(() => {
    const fetchFlights = async () => {
      const {data, error} = await supabase
      .from('flights')
      .select()
      
      if (error) {
        setError("Could not fetch Flights");
        setFlights(null);
        console.log(error);
      }

      if(data) {
        setFlights(data);
        setError(null);
      }
    }

    fetchFlights();
  }, [])

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Searching for Flights");
  }

  const login = async () => {
    await supabase.auth.signIn({
        provider: 'google'
    })
  }

  return (
    <div>
      <NavBar />
      <form className="search-bar">
        <h3>Search for flight </h3>
        <input type="text" className='search-input'/>
        <button onClick={ (e) => { handleSearch( e ) } }> Search </button>
      </form>


      <section className="main">
        <div className="filters">
          <h2 className='filters-title'> Filters </h2>
          <ul className='filters-list'>
            <li className='filter'> Destination: <input className="filter-input" type="text" /> </li>
            <li className='filter'> Origin: <input className="filter-input" type="text" /> </li>
            <li className='filter'> Airline: <input className="filter-input" type="text" /> </li>
            <li className='filter'> Departure: <input className="filter-input" type="text" /> </li>
          </ul>
        </div>
        {error && (<p> {error}</p>)}
        {flights && (
          <div className="flights">
            {flights.map( flight => (
              <FlightCard key = {flight.id} flight = {flight}/>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default App
