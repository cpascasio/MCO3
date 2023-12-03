import { useEffect, useState, useRef, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./useUserContext";

const useLogin = () => {
    const toastID = useRef();
    const nav = useNavigate();
    const {dispatch} = useUserContext()
    const login = async (username, password) => {
        try {
            toastID.current = toast.loading("Logging in now...");
            
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/users/login`,
                {
                    method: "POST",
                    body: JSON.stringify({ username, password }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const consume = await response.json();
            if (consume.state === "error") {
                toast.update(toastID.current, {
                    render: consume.message,
                    autoClose: 3000,
                    isLoading: false,
                    type: "error",
                });
                console.log(response);
                console.log(consume);
                return;
            }
            toast.update(toastID.current, {
                render: consume.message,
                autoClose: 3000,
                isLoading: false,
                type: "success",
            });
            localStorage.setItem('user', JSON.stringify({username: consume.username, token: consume.token, id: consume.id, image: consume.image}))
            dispatch({type: 'LOGIN', payload: {username: consume.username, token: consume.token, id: consume.id, image: consume.image} })
            nav("/");
            console.log("CONSUME HERE");
            console.log(consume);
            return consume;
            
        } catch (e) {
            console.log(e);
            toast.update(toastID.current, {
                render: "Something went wrong!",
                autoClose: 3000,
                isLoading: false,
                type: "error",
            });
        }
    };

    return { login };
};

/*
    const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}${url}`,
                    {
                        method: "POST",
                        body: JSON.stringify(data),
                    }
                );
                const consume = await response.json();
                if (!response.ok) {
                    setLoading(false);
                    setError(true);
                    return;
                }
                setLoading(false);
                setData(consume);
            } catch (e) {
                setLoading(false);
                setError(true);
            }
        };
        fetchData();
        
    }, [url]);
    return { loading, error, data };
};


    */

export default useLogin;
