import { useEffect, useState } from 'react'
import './App.css'
import supabase from './config/supabaseClient'

import FlightCard from './components/FlightCard';
import NavBar from './components/NavBar';
import Bookings from './components/Bookings';
import SearchForm from './components/SearchForm';
import Filters from './components/Filters';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {UserProvider} from './context'


function App() {

  const [error, setError] = useState(null);
  const [flights, setFlights] = useState(null);
  const [searchParamOrigin, setSearchParamOrigin] = useState();
  const [searchParamDestination, setSearchParamDestination] = useState();
  const [searchParamDate, setSearchParamDate] = useState();
  
  const [length, setLength] = useState(0);


  const searchParams = {
    searchParamOrigin, setSearchParamOrigin, 
    searchParamDestination, setSearchParamDestination,
    searchParamDate, setSearchParamDate
  }

  const fetchFlights = async () => {

      const { data, error } = await supabase
      .from('flights')
      .select()
      .eq('destination', searchParamDestination)
      .eq('origin', searchParamOrigin);

      
      setLength(data.length)

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


  // @react-refresh:267 Warning: A component is changing a controlled input to be uncontrolled. 
  // This is likely caused by the value changing from a defined to undefined, 
  //which should not happen. Decide between using a controlled or uncontrolled input element 
  // for the lifetime of the component. More info:

  return (
    <Router>
    <div className='App'>
      <UserProvider >
        <NavBar />
        <div className='Content'>
          <Switch>
              <Route exact path='/'>

                <SearchForm searchParams={ searchParams} fetchFlights={fetchFlights }></SearchForm>

                
                <section className="main">
                  <Filters></Filters>

                  {error && (<p> {error}</p>)}
                  {length ? (
                    flights && (
                      <div className="flights">
                        {flights.map( flight => (
                          <FlightCard key = {flight.id} flight = {flight}/>
                        ))}
                      </div>
                    )
                  ) : (
                    <div> No Flights </div>
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
