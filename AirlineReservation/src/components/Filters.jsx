

const Filters = () => {
    return ( 
        <div className="filters">
            <h2 className='filters-title'> Filters </h2>
            <ul className='filters-list'>
                <li className='filter'> Airline: <input className="filter-input" type="text" /> </li>
                <li className='filter'> Price: <input className="filter-input" type="range" min="0" max="9999" /> </li>
            </ul>
        </div>
     );
}
 
export default Filters;