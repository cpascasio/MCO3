import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import useRegister from "../../../hooks/useRegister.js";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useUserContext } from "../../../hooks/useUserContext.js";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const {register} = useRegister();
    const router = useNavigate();
    const { user } = useUserContext();


    const navigate = useNavigate();

    const handleRegister = async () => {
        // Add your authentication logic here
        if (username === "" || password === "" || cpassword === "") {
            toast.error("Please fill in all fields");
            return;
        } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
            toast.error('Username must be alphanumeric');
            return;
        } else if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        } else if (!/\d/.test(password)) {
            toast.error("Password must contain at least 1 number");
            return;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}/.test(password)) {
            toast.error('Password must contain at least one lowercasem one uppercase letter, and one special character');
            return;
        } else if (password !== cpassword) {
            toast.error("Passwords do not match");
            return;
        }

        const user = await register(username, password);
    };

    useEffect(() => {user ? router(`/`) : ''}, [user])


    return (
        <div
            className="register-container"
            style={{ backgroundColor: '#690000'}}
        >
            <div className="w-full h-screen flex justify-center items-center">
                <div
                    className="flex"
                    style={{
                        width: "70%",
                        height: "70%",
                        background: "#FFF6EA",
                        boxShadow: "15px 15px 4px rgba(0, 0, 0, 0)",
                        borderRadius: 10,
                        overflow: "hidden",
                    }}
                >
                    <img
                        src="https://res.cloudinary.com/dpzerkzhi/image/upload/v1701667322/assets/77fd39bc94612d7e67253a42297db766.svg"
                        style={{
                            width: "30%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "-620px 0px",
                        }}
                    />
                    <div
                        className="register-container"
                        style={{
                            width: "65%",
                            height: "90%",
                            boxShadow: "5px 5px 4px rgba(0, 0, 0, 0.25)",
                            borderRadius: 5,
                            border: "3px #885133 solid",
                            position: "relative",
                            left: "30px",
                            top: "30px",
                        }}
                    >
                        <h1 className="register">Register</h1>
                        <hr
                            style={{
                                width: "70%",
                                height: "3px",
                                backgroundColor: "#885133",
                                margin: "30px 0",
                                boxShadow:
                                    "5px 5px 4px 0px rgba(0, 0, 0, 0.15)",
                            }}
                        />

                        <div className="username-container">
                            <input
                                className="un placeholder-color"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ color: "#FFF6EA" }}
                            />
                        </div>
                        <input
                            className="pw placeholder-color"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ color: "#FFF6EA" }}
                        />
                        <input
                            className="pw placeholder-color"
                            type="password"
                            placeholder="Confirm Password"
                            value={cpassword}
                            onChange={(e) => setCPassword(e.target.value)}
                            style={{ color: "#FFF6EA" }}
                        />
                        <div className="reg-login-container">
                            <a href="/login" className="login">
                                <span id="alreadyhave">
                                    Already have an account?
                                </span>{" "}
                                <span id={"signin"}> Log in Now! </span>
                            </a>
                        </div>

                        <br />

                        <button
                            // onClick={handleRegister}
                            className="register-button"
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
