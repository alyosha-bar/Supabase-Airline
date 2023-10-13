import "@fortawesome/fontawesome-free/css/all.min.css"


const SearchForm = ({ searchParams, fetchFlights }) => {

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("From: " + searchParams.searchParamOrigin
     + " to " + searchParams.searchParamDestination + " on the " + searchParams.searchParamDate);

    //perform an conditional SQL query
    fetchFlights();

  }


  const switchInputs = (e) => {
    e.preventDefault();

    const temp = searchParams.searchParamOrigin;
    searchParams.setSearchParamOrigin(searchParams.searchParamDestination)
    searchParams.setSearchParamDestination(temp);

    console.log(searchParams.searchParamOrigin)
  }


    return ( 
        <form className="search-bar">
                  <h3>Search for flight </h3>
                  <input
                    placeholder='Input origin ... ' 
                    type="text" 
                    className=''
                    value={ searchParams.searchParamOrigin }
                    onChange={(e) => searchParams.setSearchParamOrigin(e.target.value) }
                  />

                  <i onClick={ (e) => {switchInputs(e)} } className="fas fa-exchange-alt fa-lg"/>

                  <input 
                    placeholder='Input destination ... '
                    type="text"
                    className=''
                    value={ searchParams.searchParamDestination }
                    onChange={ (e) => { searchParams.setSearchParamDestination(e.target.value)}}
                  />
                  <input 
                    type="date" 
                    value={ searchParams.searchParamDate }
                    onChange={ (e) => { searchParams.setSearchParamDate(e.target.value)}}
                  />
                  {/* <button onClick={ (e) => { handleSearch( e ) } }> Search </button> */}
                  <button onClick={ (e) => { handleSearch(e) } }> Search </button>
        </form>
     );
}
 
export default SearchForm;