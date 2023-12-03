import { Routes, Route } from "react-router-dom";
import routes from "./routes";

const PageRouter = () => (
    <Routes>
        {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
        ))}
    </Routes>
);

export default PageRouter;
