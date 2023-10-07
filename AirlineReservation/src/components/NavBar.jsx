import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient'
import { Link } from 'react-router-dom';

const NavBar = () => {

    const [user, setUser] = useState();
    const [session, setSession] = useState();


    const login = async () => {
        console.log('Logging in...');
        try {
            await supabase.auth.signInWithOAuth({
                provider: 'google'
            });
            console.log('Successfully signed in!');
        } catch (error) {
            console.error('Error signing in:', error.message);
        }
    }
    
    const logout = () => {
        setUser(null)
        setSession(null)
        // alert("Logged Out")
    }

    const acccount = (e) => {
        e.preventDefault();

        console.log(user.email)
    }

    useEffect( () => {
        const retirieveSession = async () => {
            const  {data, error } = await supabase.auth.getSession();
            setSession(data?.session)
            setUser(data?.session?.user)
            // console.log(user)
        }
        
        retirieveSession()
    }, [])


    return ( 
        <nav className="navbar">
            <h2 className="navbar-heading"> AirQuest </h2>
            <ul className="navbar-links">
                <li className="navbar-link"><Link to="/" className="actual-link"> Find Flights </Link></li>
                <li>
                    {user ? (
                        
                        <div className='auth-area'>
                            <div className="navbar-link"><Link to='/myBookings' className="actual-link"> myBookings </Link></div>
                            {/* <div className="navbar-link"><div className="actual-link" 
                            onClick={ () => {console.log(user.email)}}> Account </div></div> */}
                            <button className="navbar-btn"  onClick = { logout }> Log Out </button>
                        </div>
                    ) : (
                        <button className="navbar-btn" onClick={ login }> Login </button>
                    )}
                </li>
                
            </ul>
        </nav>
     );
}
 
export default NavBar;