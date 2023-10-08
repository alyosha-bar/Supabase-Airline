import { useEffect, useState } from 'react'
import './App.css'
import supabase from './config/supabaseClient'

import FlightCard from './components/flightCard';
import NavBar from './components/NavBar';
import Bookings from './components/Bookings';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {UserProvider} from './context'


function App() {

  const [error, setError] = useState(null);
  const [flights, setFlights] = useState(null);
  const [searchParamOrigin, setSearchParamOrigin] = useState("");
  const [searchParamDestination, setSearchParamDestination] = useState("");
  const [searchParamDate, setSearchParamDate] = useState("");

  const [user, setUser] = useState(null);



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

    console.log("From: " + searchParamOrigin + " to " + searchParamDestination + " on the " + searchParamDate);

    //perform an conditional SQL query


  }

  return (
    <Router>
    <div className='App'>
      <UserProvider value={ user }>
        <NavBar />
        <div className='Content'>
          <Switch>
            <Route exact path='/'>

              {/* { This needs to be a separate component} */}
              <form className="search-bar">
                <h3>Search for flight </h3>
                <input
                  placeholder='Input origin ... ' 
                  type="text" 
                  className=''
                  value={ searchParamOrigin }
                  onChange={(e) => setSearchParamOrigin(e.target.value) }
                />
                <input 
                  placeholder='Input destination ... '
                  type="text"
                  className=''
                  value={ searchParamDestination }
                  onChange={ (e) => { setSearchParamDestination(e.target.value)}}
                />
                <input 
                  type="date" 
                  value={ searchParamDate }
                  onChange={ (e) => { setSearchParamDate(e.target.value)}}
                />
                {/* <button onClick={ (e) => { handleSearch( e ) } }> Search </button> */}
                <button onClick={ (e) => { handleSearch( e ) } }> Search </button>
              </form>

              {/* { This needs to be a separate component} */}
              <section className="main">
                {/* {This needs to be a filters component} */}
                <div className="filters">
                  <h2 className='filters-title'> Filters </h2>
                  <ul className='filters-list'>
                    <li className='filter'> Airline: <input className="filter-input" type="text" /> </li>
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
        {/* { Footer } */}
        </div>
      </UserProvider>
    </div>
    </Router>
  )
}

export default App
