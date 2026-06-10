import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const agencyUsers =
      JSON.parse(localStorage.getItem("agencyUsers")) || [];

    const nonAgencyUsers =
      JSON.parse(localStorage.getItem("nonAgencyUsers")) || [];

    const users = [
      ...agencyUsers,
      ...nonAgencyUsers,
    ];

    const userByEmail = users.find(
      (user) =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    );

    const userByPassword = users.find(
      (user) =>
        user.password === password
    );

    if (!userByEmail && !userByPassword) {
      setError(
        "Invalid Email ID and Password"
      );
      return;
    }


    if (!userByEmail) {
      setError("Invalid Email ID");
      return;
    }

    if (
      userByEmail.password !== password
    ) {
      setError("Invalid Password");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(userByEmail)
    );

    navigate("/profile");
  };

  return (
    <div className="page">
      <h1 className="form-title">
        Signin to your
        <br />
        PopX account
      </h1>

      <p className="subtitle">
        Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email Address</label>

          <input
            type="text"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        {error && (
          <p className="error">{error}</p>
        )}

        <button
          type="submit"
          className="login-btn"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;