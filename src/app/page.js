const HomePage = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-center">
            <div>
                <h1>Welcome to the Ban Appeal System</h1>
                <p>Please select an option from the sidebar to manage appeals.</p>
                <p>
                    <a href="/pending" className="btn btn-primary me-2">View Pending Appeals</a>
                    <a href="/appeal" className="btn btn-success">Create an Appeal</a>
                </p>
            </div>
        </div>
    );
};

export default HomePage;
