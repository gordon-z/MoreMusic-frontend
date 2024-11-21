function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">© {new Date().getFullYear()} Website by Gordon Zhang. All Rights Reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a
                        href="https://github.com/gordon-z"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400"
                    >
                        GitHub
                    </a>
                    <a
                        href="http://www.linkedin.com/in/g-zhang"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400"
                    >
                        LinkedIn
                    </a>
                    <a href="mailto:gordon_zh@icloud.com" className="hover:text-gray-400">
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
