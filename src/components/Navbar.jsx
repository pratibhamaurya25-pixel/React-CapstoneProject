import {NavLink} from 'react-router-dom';
import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const {user,logout} = useContext(AuthContext);

  return (
    <nav>
        <h2>Nexus E-Commerce</h2>

        <div>
               <NavLink to="/">Home</NavLink>
               <NavLink to="/products">Products</NavLink>

               {user ? (
                <>
                  <span>Welcome</span>

                  <button onClick = {logout}>Logout</button>
                </>
               ): (
                <NavLink to="/Login">LoginAsAdmin</NavLink>
               )}
               
        </div>
    </nav>
  )
}

export default Navbar;