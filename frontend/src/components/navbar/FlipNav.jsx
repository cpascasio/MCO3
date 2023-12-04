import { color, motion } from "framer-motion";
import { useState } from "react";
import { FiArrowRight, FiMenu, FiSearch } from "react-icons/fi";
import "./nav.css";
import { useUser } from "../../../src/context/UserContext.jsx";
import { useUserContext } from "../../../hooks/useUserContext";

const logo = "/logo.svg";

const FlipNavWrapper = () => {
  return <FlipNav />;
};

const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const toggleSearchModal = () => {
    setIsSearchModalOpen((prev) => !prev);
  };
  return (
    <nav
      className="sticky w-full p-4 border-b-[1px] border-gray-200 flex items-center justify-between top-0 bg-e8b27a"
      style={{ backgroundColor: "white", zIndex: "10000" }}
    >
      <NavLeft setIsOpen={setIsOpen} />
      <NavRight />
      <NavMenu isOpen={isOpen} />
    </nav>
  );
};

const Logo = () => {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-gray-800"
    >
      <image href={logo} width="50" height="40" />
    </svg>
  );
};

const NavLeft = ({ setIsOpen }) => {
  return (
    <div className="flex items-center gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="block lg:hidden text-gray-950 text-3xl"
        onClick={() => setIsOpen((pv) => !pv)}
      >
        <FiMenu />
      </motion.button>
      <div>
        <a
          href="/"
          rel="nofollow"
        >
          <Logo />
        </a>
      </div>
      <NavLink text="About" href="/about" />
      <NavLink text="Explore" href="/store" />
      <NavLink text="Reviews" href="/reviews" />
      {/* <NavLink text="Company" /> */}
    </div>
  );
};

const NavLink = ({ text, href }) => {
  return (
    <a
      href={href}
      rel="nofollow"
      className="hidden lg:block h-[30px] overflow-hidden font-medium"
    >
      <motion.div whileHover={{ y: -30 }}>
        {/* before */}
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        {/* hover color */}
        <span
          className="flex items-center h-[30px]"
          style={{ color: "#9c1a1d" }}
        >
          {text}
        </span>
      </motion.div>
    </a>
  );
};

const NavRight = () => {
  // const { user } = useUser();
  const {user, dispatch} = useUserContext()
  const handleLogin = () => {
    window.location.href = "/login";
    // login(user.dispatch);
  };

  const handleLogout = () => {
    window.location.href = "/";
    localStorage.removeItem("user");
   dispatch({type: "LOGOUT"}) 
  };

  return (
    <div className="flex items-center gap-4">
      {user
        ? (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="profile-button" // Add this class
              style={{
                backgroundColor: "red",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                backgroundImage: `url(${user.image})`,
              }}
              onClick={() => {
                // Add the link to the user profile page
                window.location.href = `/profile/${user.username}`;
              }}
            >
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-white font-medium rounded-md whitespace-nowrap"
              style={{ background: "#9c1a1d" }}
              onClick={() => {
                handleLogout();
              }}
            >
              Log Out
            </motion.button>
          </>
        )
        : (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-clip-text text-transparent font-medium rounded-md whitespace-nowrap"
              style={{ color: "#9c1a1d" }}
              onClick={() => {
                handleLogin();
              }}
            >
              Log in
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-white font-medium rounded-md whitespace-nowrap"
              style={{ background: "#9c1a1d" }}
              onClick={() => window.location.href = "/register"}
            >
              Sign up
            </motion.button>
          </>
        )}
    </div>
  );
};

const NavMenu = ({ isOpen }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute p-4 bg-white shadow-lg left-0 right-0 top-full origin-top flex flex-col gap-4"
    >
      <MenuLink text="About" href="/about" />
      <MenuLink text="Explore" href="/store" />
      <MenuLink text="Reviews" href="/reviews" />
      {/* <MenuLink text="Community" href="/people" /> */}
    </motion.div>
  );
};

const MenuLink = ({ text, href }) => {
  return (
    <motion.a
      variants={menuLinkVariants}
      rel="nofollow"
      href={href}
      className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
    >
      <motion.span variants={menuLinkArrowVariants}>
        <FiArrowRight className="h-[30px] text-gray-950" />
      </motion.span>
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span
          className="flex items-center h-[30px] text-indigo-600"
          style={{ color: "#9c1a1d" }}
        >
          {text}
        </span>
      </motion.div>
    </motion.a>
  );
};

export default FlipNavWrapper;

const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};
