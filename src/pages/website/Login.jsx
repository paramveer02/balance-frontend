import { useNavigate } from "react-router";
import { Link } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:3001/xxxxxx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      login(result.token, result.user);

      localStorage.setItem("loginSuccess", "true");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
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
