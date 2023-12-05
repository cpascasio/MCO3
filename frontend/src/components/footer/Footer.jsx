const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center p-10 bg-primary text-primary-content" 
            style={{
                    backgroundImage: 'url("https://res.cloudinary.com/dpzerkzhi/image/upload/v1701763805/assets/418acfd7f5d9403a7db323a67750b3e7.png")',
                    backgroundSize: 'cover', 
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    padding: '20px', 
                    borderTop: '2px solid #9c1a1d',
            }}>
            <aside>
                <img width="200" height="200" viewBox="0 0 24 24" src="https://res.cloudinary.com/dpzerkzhi/image/upload/v1701739473/assets/3dba021f75fa9c493e701f28c810f1e4.png" fillRule="evenodd" clipRule="evenodd" className="inline-block fill-current"></img>

                <p className="font-bold text-lg" style={{color: "#FFF6EA"}}> Contact Us </p> 
                <p style={{color: "#f49294"}}> <span className="font-semibold"> Email Address: </span>taft.buds@gmail.com </p>
                <p style={{color: "#f49294"}}> <span className="font-semibold"> Contact Number: </span> 09123456789 </p>
            </aside>
            </footer>
        </div>
    );
};

export default Footer;