import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useState, useContext } from "react";
import { signIn } from "../../data/auth";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [{ email, password }, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) throw new Error("All fields required");
      setLoading(true);
      const user = await signIn({ email, password });
      setUser(user);
      console.log("Login successful. Welcome back!");
      navigate("/allowance");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content w-xl flex-col gap-8 justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-medium">Login now</h1>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form className="fieldset" onSubmit={handleSubmit}>
                <div className="flex flex-col w-full">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                    className="input w-full"
                  />
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-neutral mt-4">
                  Login
                </button>
                <p className="text-base text-center">
                  Don't have an account?{" "}
                  {
                    <Link
                      to="/signup"
                      className="link link-hover text-blue-800"
                    >
                      Sign up
                    </Link>
                  }
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
