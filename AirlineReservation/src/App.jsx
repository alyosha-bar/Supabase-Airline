import { useEffect, useState } from 'react'
import './App.css'
import supabase from './config/supabaseClient'

import FlightCard from './components/flightCard';
import NavBar from './components/NavBar';
import Bookings from './components/Bookings';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
    <Router>
    <div className='App'>
      <NavBar />
      <div className='Content'>
        <Switch>
          <Route path='/'>

            {/* { This needs to be a separate component} */}
            <form className="search-bar">
              <h3>Search for flight </h3>
              <input type="text" className='search-input'/>
              <button onClick={ (e) => { handleSearch( e ) } }> Search </button>
            </form>

            {/* { This needs to be a separate component} */}
            <section className="main">
              {/* {This needs to be a filters component} */}
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
          </Route>
          <Route exact path='/myBookings'>
            <Bookings />
          </Route>
      </Switch>
      </div>
    </div>
    </Router>
  )
}

export default App
