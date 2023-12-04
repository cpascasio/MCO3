import React from 'react';
import './about.css'; //

const About = () => {
  return (
    <div className="about-page">
    <div className="about-container">
      <header>
        {/* Logo */}
        <img
            src="https://res.cloudinary.com/dpzerkzhi/image/upload/v1701702265/assets/0ebd9707c0721a8261b4554c2092c382.svg"
            alt="Your Logo"
            style={{
                width: '100px',
                height: 'auto',
                display: 'inline-block',
                margin: '0 auto',
            }}
        />
        <h1 style={{ color: '#f49294', fontSize: '40px', fontWeight: 'bold'}}> About Us </h1>
      </header>
      <section className="about-content">
        <p> Taft Buds invites you to embark on a culinary exploration in the heart of <span style={{ color: "#f49294", fontWeight: "bold" }}> Taft, Manila </span>, with our restaurant review website.
             Dedicated to empowering the community, we provide a platform for individuals to share their dining experiences and recommendations. 
             Our slogan, <span style={{ color: "#f49294", fontWeight: "bold" }}> "Discover the perfect Taft restaurant to satisfy your taste buds!" </span> encapsulates the essence of our user-driven approach. 
             Taft Buds is not just a review site; it's a dynamic community where locals and visitors alike contribute their insights, helping you find the ideal dining spot tailored to your preferences. 
             Join us in celebrating the diverse and delectable culinary scene in Taft through firsthand experiences shared by fellow food enthusiasts. 
        </p>
      </section>

      <br />

      {/* Third Party Libraries */}
      <section className="library-section">
        <h2 style={{ color: '#f06e71', fontSize: '25px', fontWeight: 'bold'}}>Component Libraries</h2>
        <table>
          <thead>
            <tr>
              <th>Library</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hover.dev</td>
              <td>Animated UI Components for React & Tailwind</td>
            </tr>
            <tr>
              <td>DaisyUI</td>
              <td>Component Library for Tailwind</td>
            </tr>
            <tr>
              <td>Cloudinary</td>
              <td>Cloud-based image and video management services</td>
            </tr>
            <tr>
              <td>MongoDB Atlas</td>
              <td>Cloud database</td>
            </tr>
            <tr>
              <td>Mongoose</td>
              <td>Object Data Modeling (ODM) library for MongoDB</td>
            </tr>
          </tbody>
        </table>
      </section>

    <br />

      {/* NPM Packages */}
      <section className="library-section">
        <h2 style ={{ color: '#f06e71', fontSize: '25px', fontWeight: 'bold'}}>NPM Packages (Frontend Dependencies)</h2>
        <table>
          <thead>
            <tr>
              <th>Package</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>@fortawesome/fontawesome-svg-core (^6.4.2)</td>
              <td>Font Awesome SVG core library</td>
            </tr>
            <tr>
              <td>@fortawesome/free-solid-svg-icons (^6.4.2)</td>
              <td>Free solid SVG icons from Font Awesome</td>
            </tr>
            <tr>
              <td>@fortawesome/react-fontawesome (^0.2.0)</td>
              <td>Font Awesome icons as React components</td>
            </tr>
            <tr>
              <td>axios (^1.6.2)</td>
              <td>Promise-based HTTP client for the browser and Node.js</td>
            </tr>
            <tr>
              <td>esbuild (^0.19.5)</td>
              <td>Fast JavaScript bundler and minifier</td>
            </tr>
            <tr>
              <td>framer-motion (^10.16.4)</td>
              <td>A library for creating fluid animations in React</td>
            </tr>
            <tr>
              <td>install (^0.13.0)</td>
              <td>Dependency installer for frontend projects</td>
            </tr>
            <tr>
              <td>npm (^10.2.1)</td>
              <td>Node package manager for JavaScript</td>
            </tr>
            <tr>
              <td>react (^18.2.0)</td>
              <td>A JavaScript library for building user interfaces</td>
            </tr>
            <tr>
              <td>react-dom (^18.2.0)</td>
              <td>React package for working with the DOM</td>
            </tr>
            <tr>
              <td>react-icons (^4.11.0)</td>
              <td>SVG icons for popular icon sets in React</td>
            </tr>
            <tr>
              <td>react-router-dom (^6.16.0)</td>
              <td>Declarative routing for React</td>
            </tr>
            <tr>
              <td>react-select (^5.7.7)</td>
              <td>A flexible and customizable Select input control for React</td>
            </tr>
            <tr>
              <td>react-toastify (^9.1.3)</td>
              <td>Toast notifications for React applications</td>
            </tr>
            <tr>
              <td>react-use-measure (^2.1.1)</td>
              <td>React hook for measuring components</td>
            </tr>
            <tr>
              <td>react-uuid (^2.0.0)</td>
              <td>Generate RFC4122 version 4 UUIDs for React</td>
            </tr>
          </tbody>
        </table>
      </section>

      <br />

      {/* NPM Packages (DevDependencies) */}
      <section className="library-section">
        <h2 style ={{ color: '#f06e71', fontSize: '25px', fontWeight: 'bold'}}>NPM Packages (Frontend DevDependencies)</h2>
        <table>
          <thead>
            <tr>
              <th>Package</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>@types/react (^18.2.15)</td>
              <td>TypeScript type definitions for React</td>
            </tr>
            <tr>
              <td>@types/react-dom (^18.2.7)</td>
              <td>TypeScript type definitions for ReactDOM</td>
            </tr>
            <tr>
              <td>@vitejs/plugin-react (^4.0.3)</td>
              <td>Vite plugin for React support</td>
            </tr>
            <tr>
              <td>autoprefixer (^10.4.16)</td>
              <td>PostCSS plugin to parse CSS and add vendor prefixes</td>
            </tr>
            <tr>
              <td>daisyui (^3.8.3)</td>
              <td>Tailwind CSS component library</td>
            </tr>
            <tr>
              <td>eslint (^8.45.0)</td>
              <td>Pluggable linting utility for JavaScript and JSX</td>
            </tr>
            <tr>
              <td>eslint-plugin-react (^7.32.2)</td>
              <td>React-specific linting rules for ESLint</td>
            </tr>
            <tr>
              <td>eslint-plugin-react-hooks (^4.6.0)</td>
              <td>ESLint rules for React hooks</td>
            </tr>
            <tr>
              <td>eslint-plugin-react-refresh (^0.4.3)</td>
              <td>ESLint plugin for React Fast Refresh</td>
            </tr>
            <tr>
              <td>postcss (^8.4.31)</td>
              <td>A tool for transforming CSS with JavaScript plugins</td>
            </tr>
            <tr>
              <td>prettier (^3.0.3)</td>
              <td>Opinionated code formatter</td>
            </tr>
            <tr>
              <td>tailwindcss (^3.3.3)</td>
              <td>A utility-first CSS framework for rapid UI development</td>
            </tr>
            <tr>
              <td>vite (^4.5.0)</td>
              <td>Fast, opinionated frontend build tool</td>
            </tr>
          </tbody>
        </table>
      </section>

      <br />

      {/* Backend Libraries */}
      <section className="library-section">
        <h2 style ={{ color: '#f06e71', fontSize: '25px', fontWeight: 'bold'}}>NPM Packages (Backend Dependencies)</h2>
        <table>
          <thead>
            <tr>
              <th>Library</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>bcrypt (^5.1.1)</td>
              <td>A library for hashing passwords</td>
            </tr>
            <tr>
              <td>cloudinary (^1.41.0)</td>
              <td>A cloud service for image and video management</td>
            </tr>
            <tr>
              <td>cors (^2.8.5)</td>
              <td>Middleware for handling Cross-Origin Resource Sharing (CORS) in Express</td>
            </tr>
            <tr>
              <td>dotenv (^16.3.1)</td>
              <td>Zero-dependency module that loads environment variables from a .env file into process.env</td>
            </tr>
            <tr>
              <td>express (^4.18.2)</td>
              <td>Fast, unopinionated, minimalist web framework for Node.js</td>
            </tr>
            <tr>
              <td>express-fileupload (^1.4.2)</td>
              <td>Middleware for handling file uploads in Express</td>
            </tr>
            <tr>
              <td>jsonwebtoken (^9.0.2)</td>
              <td>Implementation of JSON Web Tokens (JWT) for authentication</td>
            </tr>
            <tr>
              <td>mongodb (^6.2.0)</td>
              <td>Official MongoDB driver for Node.js</td>
            </tr>
            <tr>
              <td>mongoose (^8.0.0)</td>
              <td>MongoDB object modeling tool designed to work in an asynchronous environment</td>
            </tr>
            <tr>
              <td>validator (^13.11.0)</td>
              <td>Library of string validation and sanitization functions</td>
            </tr>
          </tbody>
        </table>
      </section>

      <br />

      {/* Backend DevDependencies */}
      <section className="library-section">
        <h2 style ={{ color: '#f06e71', fontSize: '25px', fontWeight: 'bold'}}>NPM Packages (Backend DevDependencies)</h2>
        <table>
          <thead>
            <tr>
              <th>Package</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>nodemon (^3.0.1)</td>
              <td>Utility that monitors for changes in your Node.js application and automatically restarts the server</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    </div>
  );
};

export default About;
