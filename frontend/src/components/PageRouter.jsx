import { Routes, Route, useNavigate } from "react-router-dom";
import routes from "./routes";
import { useEffect } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { useState } from "react";
import axios from "axios";


const PageRouter = () => {

    const rememberMe = localStorage.getItem('rememberMe');
    const { user, dispatch } = useUserContext();
    const navigate = useNavigate();
    const [retrigger, setRetrigger] = useState(false);

    const remainingWeeks = (givenDate) => {
        const today = new Date();
        const expirationDate = new Date(givenDate);
        const timeDifference = expirationDate.getTime() - today.getTime();
    
        const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const remainingWeeks = Math.floor(remainingDays / 7);
    
        return remainingWeeks;
      };

      const remainingSeconds = (givenDate) => {
        const today = new Date();
        const expirationDate = new Date(givenDate);
        const timeDifference = expirationDate.getTime() - today.getTime();
    
        const remainingSeconds = Math.floor(timeDifference / 1000);
    
        return remainingSeconds;
      };

      useEffect(() => {
        let interval;
        if (user) {
          const expDate = new Date(JSON.parse(localStorage.getItem('user')).expires)
          if (remainingSeconds(expDate) < 5) {
            alert("Your session has expired, you will be logged out automatically")
            localStorage.removeItem("user");
            dispatch({type: "LOGOUT"}) 
            navigate('/')
          } else {
            interval = setInterval(() => {
              if (remainingSeconds(expDate) < 5) {
                alert('Your session has expired, you will be logged out automatically');
                localStorage.removeItem("user");
                dispatch({type: "LOGOUT"}) 
                clearInterval(interval);
                navigate('/')
              }
            }, 10000); // 10 seconds
          }
        }
    
        return () => clearInterval(interval);
      }, [user, retrigger]);

      useEffect(() => {
        if (rememberMe === 'true') {
          const userObject = JSON.parse(localStorage.getItem('user'))
          const token = JSON.parse(localStorage.getItem('user')).token
          if (remainingWeeks(new Date(userObject.expDate)) < 1) { //once the token lasts for less than a week and the user wants to be remembered it will be refreshed.
            axios.post(process.env.VITE_BASE_URL + '/api/users/refresh_token/', { refreshToken: token }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }).then(res => {
              userObject.token = res.data.token
              userObject.expires = res.data.expires
              localStorage.setItem('user', JSON.stringify(userObject)) //extends token for 3 more weeks
              setRetrigger(true)
            })
          }
        }
      }, [])

    return(

    <Routes>
        {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
        ))}
    </Routes>


);

        }

export default PageRouter;
