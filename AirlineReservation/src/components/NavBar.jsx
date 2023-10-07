import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient'

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
            console.log(user)
        }
        
        retirieveSession()
    }, [])


    return ( 
        <nav className="navbar">
            <h2 className="navbar-heading"> AirQuest </h2>
            <ul className="navbar-links">
                <li className="navbar-link"><a className="actual-link"> Find Flights </a></li>
                {/* <li className="navbar-link"><a> Login </a></li> */}
                <li>
                    {user ? (
                        
                        <div className='auth-area'>
                            <div className="navbar-link"><a className="actual-link"> myBookings </a></div>
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