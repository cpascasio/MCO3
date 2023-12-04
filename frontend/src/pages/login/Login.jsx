import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../../src/context/UserContext.jsx";
import "./login.css";
import { toast } from "react-toastify";
import useLogin from "../../../hooks/useLogin.js";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { user, dispatch } = useUser(); // Access user context
    const { login } = useLogin()
    const router = useNavigate()
    const [rememberMe, setRememberMe] = useState(false);
    /*
    const handleLogin = () => {
        // Add your authentication logic here
        if (username === 'ceejaypascasio' && password === '12345678') {
            login(dispatch); // Dispatch the LOGIN action
            navigate('/'); // Redirect to the home page
        } else {
            // Failed login, display an error message or handle as needed
            alert('Login failed');
        }
    }
    */

    const handleLogin = async () => {
        // Add your authentication logic here
        const user = await login(username, password)
        console.log(username)
        console.log(password)
    }

    // Function to toggle the "Remember Me" state
    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    useEffect(() => {user ? router(`/`) : ''}, [user])
    
    return (
        <div className="login-container" style={{ backgroundImage: 'url("https://res.cloudinary.com/dpzerkzhi/image/upload/v1701667833/assets/7cf4cd2c83059dae9a9120663e3fe328.svg")', opacity: 0.9}}>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="flex" style={{width: '70%', height: '70%', background: '#FFF6EA', boxShadow: '15px 15px 4px rgba(0, 0, 0, 0)',  borderRadius: 10, overflow: "hidden"}}>
                    <img src='https://res.cloudinary.com/dpzerkzhi/image/upload/v1701667322/assets/77fd39bc94612d7e67253a42297db766.svg' style={{width: '30%', height: '100%', objectFit: "cover", objectPosition: "-650px 0px"}}/>
                    <div className='login-container' style={{width: '65%', height: '90%', boxShadow: '5px 5px 4px rgba(0, 0, 0, 0.25)', borderRadius: 5, border: '3px #885133 solid', position: 'relative', left: '30px', top: '30px'}}>
                        <h1 className="login">Login</h1>
                        <hr style={{ width: '70%', height: '3px', backgroundColor: '#885133', margin: '30px 0', boxShadow: '5px 5px 4px 0px rgba(0, 0, 0, 0.15)'}} />
                        <div className="username-container">
                            <input
                                className="un"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{color: '#FFF6EA'}}
                            />
                        </div>
                        <input
                            className="pw"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{color: '#FFF6EA'}}
                        />
                        <div className="rememberme-container">
                            <input
                                type="checkbox"
                                id="rememberMeCheckbox"
                                checked={rememberMe}
                                onChange={toggleRememberMe}
                            />
                            <label htmlFor="rememberMeCheckbox" className="rememberMe">Remember Me</label>
                        
                        </div>

                        <div className="signup-container">
                            <a href="/register" className="signup">
                                <span id='donthave'>Don't have an account?</span> <span id={'signup'}> Sign up Now! </span>
                            </a>
                        </div>
                        <button
                            onClick={handleLogin}
                            className="login-button"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
