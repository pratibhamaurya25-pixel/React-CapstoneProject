import {AuthContext} from "../context/AuthContext";
import {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const {login} = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    const success = login(email, password);

    if (success) {
      navigate("/admin");
    } else {
      alert("Invalid Email or Password");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

      <input
       type="email"
       onChange={(e)=> setEmail(e.target.value)}
       placeholder="Enter email"
       />

       <input
       type="password"
       onChange={(e)=> setPassword(e.target.value)}
       placeholder="Enter password"
       />

       <button type="submit">Login</button>

       </form>
    </div>
  )
}

export default Login