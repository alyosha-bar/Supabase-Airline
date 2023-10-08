import { useContext } from "react";
import { UserContext } from "../context";

const Bookings = () => {
    const user = useContext(UserContext);

    return ( 
        <button onClick={ () => console.log(user.user.email)}> Here are your Bookings </button>
     );
}
 
export default Bookings;