


const SearchForm = ({ searchParams }) => {

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("From: " + searchParams.searchParamOrigin
     + " to " + searchParams.searchParamDestination + " on the " + searchParams.searchParamDate);

    //perform an conditional SQL query

  }

    return ( 
        <form className="search-bar">
                  <h3>Search for flight </h3>
                  <input
                    placeholder=' Input origin ... ' 
                    type="text" 
                    className=''
                    value={ searchParams.searchParamOrigin }
                    onChange={(e) => searchParams.setSearchParamOrigin(e.target.value) }
                  />
                  <input 
                    placeholder=' Input destination ... '
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