const ReviewSearchBar = ({ searchQuery, handleSearch, handleSearchChange }) => {
    return (
        <>
            {/* input type="text" placeholder="Search here" className="input input-bordered w-full max-w-xs" style={{marginLeft: '7rem', backgroundColor: '#f4f0ec'}} */}
            <div className="form-control">
                <div className="input-group" style={{ marginTop: "1.5rem" }}>
                    <input
                        type="text"
                        value={searchQuery}  // Pass the correct state here
                        onChange={(e) => {
                            handleSearchChange(e);
                            handleSearch(e.target.value);
                        }}
                        className="input w-[20rem] input-bordered"
                        style={{
                            marginLeft: "7rem",
                            backgroundColor: "#f4f0ec",
                            color: "black",
                        }}
                    />
                    <button
                        className="btn btn-square"
                        style={{
                            borderColor: "#885133",
                            backgroundColor: "#885133",
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleSearch(searchQuery);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#f4f0ec"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ReviewSearchBar;
