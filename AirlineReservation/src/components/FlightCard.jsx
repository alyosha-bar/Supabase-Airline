import "@fortawesome/fontawesome-free/css/all.min.css"

const FlightCard = ({ flight }) => {
    return ( 
    <div className="flight-card">
        <h3 className="flight-title">{flight.origin} <i className="fas fa-thin fa-plane fa-xs"></i> {flight.destination}</h3>
        <div className="flight-airline"> {flight.airline}</div>
        <div className="flight-date"> {flight.departure} </div>
        <div className="flight-info-group">
            <p className="flight-price">£{flight.price}</p>
            {flight.seats_available < 10 ? 
            <p className="seat-availability-label-red"> {flight.seats_available} left!! </p>
             : <p className="seat-availability-label"> {flight.seats_available} left </p>}
        </div>
    </div> 
    );
}
 
export default FlightCard;