import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import AlertMessage from "../layout/AlertMessage";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Confirm = () => {
  const email = localStorage.getItem("email") || "";
  // const username = localStorage.getItem("username") || "";
  const firstName = localStorage.getItem("firstName") || "";
  const lastName = localStorage.getItem("lastName") || "";
  const { confirmUser } = useContext(AuthContext);
  const [alert, setAlert] = useState(null);
  const [confirmCode, setConfirmCode] = useState();
  const history = useHistory();
  const confirm = async (event) => {
    event.preventDefault();
    try {
      const confirmData = await confirmUser({
        email: email,
        code: confirmCode,
        firstName: firstName,
        lastName: lastName,
      });
      if (!confirmData.success) {
        setAlert({ type: "danger", message: confirmData.message });
        setTimeout(() => setAlert(null), 5000);
      }
      setAlert({ type: "success", message: confirmData.message });
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={confirm}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Confirm code"
            name="confirm"
            required
            onChange={(event) => {
              setConfirmCode(event.target.value);
              console.log(event.target.value);
            }}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Confirm
        </Button>
      </Form>
    </>
  );
};

export default Confirm;
