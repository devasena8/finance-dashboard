import { useState } from "react";

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // SIGN IN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Invalid email or password"
        );
      }

      localStorage.setItem(
        "token",
        data.access_token
      );

      onLogin(data);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SIGN UP
  // =========================

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Registration failed"
        );
      }

      // Registration successful
      setSuccess(
        "Account created successfully! Please sign in."
      );

      // Clear form
      setName("");
      setEmail("");
      setPassword("");

      // Switch back to Sign In
      setIsRegistering(false);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SWITCH BETWEEN FORMS
  // =========================

  const switchForm = () => {
    setIsRegistering(!isRegistering);

    setError("");
    setSuccess("");

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-icon">
          💰
        </div>

        <h1>Finance Dashboard</h1>

        <p className="auth-subtitle">
          {isRegistering
            ? "Create an account to manage your finances"
            : "Sign in to manage your finances"}
        </p>

        {/* ERROR */}

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="auth-success">
            {success}
          </div>
        )}

        {/* =========================
            SIGN UP FORM
        ========================= */}

        {isRegistering ? (

          <form onSubmit={handleRegister}>

            <div className="auth-group">

              <label>Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>

            <div className="auth-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            <div className="auth-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Sign Up"}
            </button>

          </form>

        ) : (

          /* =========================
             SIGN IN FORM
          ========================= */

          <form onSubmit={handleLogin}>

            <div className="auth-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            <div className="auth-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>

        )}

        {/* =========================
            SWITCH BUTTON
        ========================= */}

        <p className="auth-switch">

          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            type="button"
            onClick={switchForm}
          >
            {isRegistering
              ? "Sign In"
              : "Sign Up"}
          </button>

        </p>

      </div>

    </div>
  );
}

export default Login;