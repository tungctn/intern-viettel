import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";

const RegisterForm = () => {
  // Context
  const userPoolId = "ap-south-1_yJkFCWKBe";
  const ClientId = "5cart8upbof92fbs0omoj0q4la";
  const { registerUser } = useContext(AuthContext);
  const poolData = {
    UserPoolId: userPoolId, // Your user pool id here
    ClientId: ClientId, // Your client id here
  };

  const userPool = new CognitoUserPool(poolData);
  const attributeList = [];

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword, email } = registerForm;
  const handleRegister = async (username, email, password) => {
    return await new Promise((resolve, reject) => {
      const emailData = {
        Name: "email",
        Value: email,
      };

      const emailAttribute = new CognitoUserAttribute(emailData);

      attributeList.push(emailAttribute);

      userPool.signUp(
        email,
        password,
        attributeList,
        null,
        function (err, result) {
          if (err) {
            console.log(err.message);
            reject();
          } else {
            const cognitoUser = result.user;
            console.log("user name is " + cognitoUser.getUsername());
            resolve();
          }
        }
      );
    });
  };

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
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const register = (event) => {
  //   console.log("register");
  //   event.preventDefault();
  //   handleRegister(username, email, password)
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />

        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
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
