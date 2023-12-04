import React from "react";
import Store from "../pages/store/Store";
import Homepage from "../pages/homepage/Homepage";
import Login from "../pages/login/Login"
import Register from "../pages/register/Register";
import StorePage from "../pages/storepage/StorePage";
import Reviews from "../pages/reviews/Reviews";
import People from "../pages/people/People";
import Profile from "../pages/profile/profile.jsx";
import About from "../pages/about/about.jsx";


const routes = [
    {/* CTRL + CLICK the elements to go to the file */},
    { path: "/", element: <Homepage />, name: "Homepage" },
    { path: "/store", element: <Store />, name: "Store"  },

    { path: "/login", element: <Login/>, name: "Login" , protected: true },
    { path: "/register", element: <Register />, name: "Register" },
    { path: "/store/:id", element: <StorePage />, name: "Store" },
    { path: "/reviews", element: <Reviews />, name: "Reviews" },
    { path: "/people", element: <People />, name: "People" },
    { path: "/profile/:username", element: <Profile />, name: "Profile" },
    { path: "/about", element: <About />, name: "About" },
];

export default routes;
