import Form from "../components/Form";

function Login({ setIsAuthorized }) {
    return (
        <Form
            route="/api/token/"
            method="login"
            setIsAuthorized={setIsAuthorized}
        />
    );
}

export default Login;
