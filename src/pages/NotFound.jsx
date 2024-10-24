function NotFound() {
    return (
        <div>
            <h1>404 Not Found</h1>
            <p>The page that you're looking for does not exist!</p>
            <Link to="/" className="w-full bg-lime-600 hover:bg-lime-700 active:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300">
                Go Back to Home
            </Link>
        </div>
    );
}

export default NotFound;
