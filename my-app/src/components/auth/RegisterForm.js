import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);
  const history = useHistory();

  // Local state
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [alert, setAlert] = useState(null);

  const { firstName, lastName, password, confirmPassword, email } =
    registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      await registerUser(registerForm);
      console.log("registerForm", registerForm);
      history.push("/confirm");
      localStorage.setItem("email", email);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />

        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="firstName"
            required
            value={firstName}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="lastName"
            required
            value={lastName}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Email"
            name="email"
            required
            value={email}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
