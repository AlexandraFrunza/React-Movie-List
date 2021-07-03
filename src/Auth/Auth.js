import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { apiUrl } from "../shared/config";
import { useGlobalMessage } from "../shared/GlobalMessage";
import { useAuthContext } from "./AuthContext";

export function Auth() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    retypePassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    retypePassword: "",
  });
  const createMessage = useGlobalMessage();

  const { token, setToken, setUser } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token, history]);

  const location = useLocation();
  const isRegister = location.pathname.includes("register");

  const title = isRegister ? "Register" : "Login";
  const alternateLink = {
    Login: (
      <span>
        Don't have an account? <Link to="/register">Register here.</Link>
      </span>
    ),
    Register: (
      <span>
        Already have an account? <Link to="/login">Login instead.</Link>
      </span>
    ),
  };

  function handleInputChange(e) {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });

    setErrors({ ...errors, [e.target.id]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isFormValid() === false) {
      return;
    }

    const { retypePassword, ...onlyUsefulParams } = values;

    const res = await fetch(
      `${apiUrl}/auth/${isRegister ? "register" : "login"}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(onlyUsefulParams),
      }
    ).then((res) => res.json());

    if (res.message) {
      createMessage("error", "Something bad happened!", res.message);
      return;
    }

    if (res.authenticated) {
      setToken(res.accessToken);
      setUser(values.username);
      createMessage(
        "success",
        "Logged in successfully!",
        "You have been logged in successfully!"
      );
      history.push("/");
    }
  }

  function isFormValid() {
    let isValid = true;
    const newErrors = { ...errors };

    if (values.username.length === 0) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    if (isRegister && values.retypePassword !== values.password) {
      newErrors.retypePassword = "The passwords need to be the same.";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  }

  if (token) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{title}</h1>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className={`form-control${
            errors.username !== "" ? " is-invalid" : ""
          }`}
          id="username"
          onChange={handleInputChange}
          value={values.username}
          placeholder="Username"
        />
        <div className="invalid-feedback">{errors.username}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className={`form-control${
            errors.password !== "" ? " is-invalid" : ""
          }`}
          id="password"
          onChange={handleInputChange}
          value={values.password}
        />
        <div className="invalid-feedback">{errors.password}</div>
      </div>
      {isRegister ? (
        <div className="mb-3">
          <label htmlFor="retypePassword" className="form-label">
            Retype Password
          </label>
          <input
            type="password"
            className={`form-control${
              errors.retypePassword !== "" ? " is-invalid" : ""
            }`}
            id="retypePassword"
            onChange={handleInputChange}
            value={values.retypePassword}
          />
          <div className="invalid-feedback">{errors.retypePassword}</div>
        </div>
      ) : null}
      <button type="submit" className="btn btn-primary me-3">
        {title}
      </button>
      {alternateLink[title]}
    </form>
  );
}
