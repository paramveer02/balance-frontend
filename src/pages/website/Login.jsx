// Login
import { useState } from "react";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const loginAction = async ({ request }) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("User logged in Successfully");

    // Optional delay to render lottie loader: since await bloacks further execution
    await new Promise((res) => setTimeout(res, 2000));
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Login failed");
    return error;
  }
};

const loaderUrl = "/lottie/loader.lottie";

export default function Login() {
  const [showPw, setShowPw] = useState(false);
  const navigation = useNavigation();
  const busy =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="relative min-h-screen overflow-hidden">
      {busy && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <DotLottieReact
              src={loaderUrl}
              autoplay
              loop
              style={{ width: 160, height: 160 }}
            />
            <p className="text-slate-100">Signing you in…</p>
          </div>
        </div>
      )}
      {/* Bold mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(40rem_40rem_at_-10%_10%,rgba(147,51,234,0.25),transparent_60%),radial-gradient(35rem_35rem_at_110%_110%,rgba(16,185,129,0.22),transparent_55%),linear-gradient(120deg,rgba(59,130,246,0.15),transparent)]" />

      <div className="relative min-h-screen flex items-center justify-center px-6 py-16">
        {/* Gradient ring card */}
        <div className="w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-r from-purple-500 via-sky-500 to-emerald-500 shadow-[0_10px_60px_rgba(79,70,229,.25)]">
          <div className="rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/10">
            {/* Header */}
            <div className="px-7 pt-8 pb-4 text-center">
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Log in
              </h1>
              <p className="mt-2 text-slate-300">Welcome back to balance ✨</p>
            </div>

            {/* Form */}
            <div className="px-7 pb-7">
              <Form method="post" className="space-y-5">
                {/* Email */}
                <label className="block">
                  <span className="block mb-2 text-sm font-semibold text-slate-200">
                    Email
                  </span>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 focus-within:border-emerald-400">
                    <FiMail className="text-slate-400 text-lg" />
                    <input
                      name="email"
                      type="email"
                      defaultValue="param@test.com"
                      placeholder="you@balance.app"
                      className="w-full bg-transparent text-slate-100 placeholder-slate-500 outline-none"
                      required
                    />
                  </div>
                </label>

                {/* Password */}
                <label className="block">
                  <span className="block mb-2 text-sm font-semibold text-slate-200">
                    Password
                  </span>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 focus-within:border-emerald-400">
                    <FiLock className="text-slate-400 text-lg" />
                    <input
                      name="password"
                      type={showPw ? "text" : "password"}
                      defaultValue="user123!"
                      placeholder="••••••••"
                      className="w-full bg-transparent text-slate-100 placeholder-slate-500 outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      className="text-slate-400 hover:text-slate-200"
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </label>

                <div className="flex items-center justify-between text-sm">
                  <span />
                  <Link
                    to="/forgot-password"
                    className="text-sky-400 hover:text-sky-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Primary CTA */}
                <button
                  type="submit"
                  className="w-full rounded-xl py-3 font-semibold text-white shadow-lg transition hover:cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(to right, var(--secondary-color), var(--primary-color))",
                    "--tw-bg-opacity": "1",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.filter = "brightness(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.filter = "brightness(1)";
                  }}
                >
                  Log in
                </button>
              </Form>

              <div className="mt-6 text-center text-sm text-slate-300">
                New here?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-sky-400 hover:text-sky-300"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom micro-benefits */}
        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6 text-xs text-slate-300/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Consistency
            over perfection
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" /> Guilt-free
            coaching
          </div>
        </div>
      </div>
    </div>
  );
}
