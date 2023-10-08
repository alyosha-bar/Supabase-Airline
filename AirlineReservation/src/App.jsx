import { useEffect, useState } from 'react'
import './App.css'
import supabase from './config/supabaseClient'

import FlightCard from './components/flightCard';
import NavBar from './components/NavBar';
import Bookings from './components/Bookings';
import SearchForm from './components/SearchForm';
import Filters from './components/Filters';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {UserProvider} from './context'


function App() {

  const [error, setError] = useState(null);
  const [flights, setFlights] = useState(null);
  const [searchParamOrigin, setSearchParamOrigin] = useState("");
  const [searchParamDestination, setSearchParamDestination] = useState("");
  const [searchParamDate, setSearchParamDate] = useState("");

  const searchParams = {
    searchParamOrigin, setSearchParamOrigin, 
    searchParamDestination, setSearchParamDestination,
    searchParamDate, setSearchParamDate
  }


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
      <UserProvider >
        <NavBar />
        <div className='Content'>
          <Switch>
              <Route exact path='/'>

                <SearchForm searchParams={ searchParams }></SearchForm>

                
                <section className="main">
                  <Filters></Filters>

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
