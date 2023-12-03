
const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center p-10 bg-primary text-primary-content" style={{
                    backgroundColor: "white",
                    backgroundImage: 'url("/footer.svg")', // Replace with your image path
                    backgroundSize: 'cover', // You can adjust this property
                    backgroundRepeat: 'no-repeat',
                    padding: "20px" }}>
            <aside>
                <img width="80" height="80" viewBox="0 0 24 24" src="/logo.svg" fillRule="evenodd" clipRule="evenodd" className="inline-block fill-current"></img>

                <p className="font-bold text-lg" style={{color: "#9c1a1d"}}> Contact Us </p> 
                <p style={{color: "#885133"}}> <span className="font-semibold"> Email Address: </span>taft.buds@gmail.com </p>
                <p style={{color: "#885133"}}> <span className="font-semibold"> Contact Number: </span> 09123456789 </p>
            </aside>
            </footer>
        </div>
    );
};

export default Footer;