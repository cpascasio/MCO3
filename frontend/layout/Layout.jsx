// Layout.js
import React from "react";
import { UserProvider } from "../../frontend/src/context/UserContext.jsx";
import FlipNavWrapper from "../src/components/navbar/FlipNav";
import PageRouter from "../src/components/PageRouter";
import Footer from "../src/components/footer/Footer";

const Layout = () => {
    return (
        <UserProvider>
            <div>
                {/* Your layout components */}
                <FlipNavWrapper />
                <PageRouter />
                <Footer />
            </div>
        </UserProvider>
    );
};

export default Layout;
