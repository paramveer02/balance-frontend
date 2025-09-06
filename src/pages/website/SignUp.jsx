import { useState } from "react";
import { Form, Link, redirect } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import {
  FiUser,
  FiUserPlus,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

export const signupAction = async ({ request }) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    await customFetch.post("/auth/signup", data);
    toast.success("Registration Successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Sign up failed");
    return error;
  }
};

export default function SignUp() {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Bold mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(40rem_40rem_at_-10%_10%,rgba(147,51,234,0.25),transparent_60%),radial-gradient(35rem_35rem_at_110%_110%,rgba(16,185,129,0.22),transparent_55%),linear-gradient(120deg,rgba(59,130,246,0.15),transparent)]" />

      <div className="relative min-h-screen flex items-center justify-center px-6 py-16">
        {/* Two-panel card (stack on mobile) */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-[0_10px_60px_rgba(79,70,229,.25)]">
          {/* Left: vibe panel */}
          <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-b from-slate-950/90 to-slate-900/90 border border-white/10">
            <div>
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Balance starts here
              </h2>
              <p className="mt-3 text-slate-300">
                Log indulgences, add healthy habits, and let AI build your
                weekly plan.
              </p>
            </div>

            <ul className="mt-8 space-y-4 text-slate-300/90">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />{" "}
                Personalized balance plans
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-sky-400" /> Streaks,
                levels, motivation
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-400" /> Private
                & secure
              </li>
            </ul>

            <div className="text-xs text-slate-400">
              No spam. Cancel anytime.
            </div>
          </div>

          {/* Right: form panel with gradient ring */}
          <div className="p-[1px] bg-gradient-to-r from-purple-500 via-sky-500 to-emerald-500">
            <div className="h-full rounded-tr-2xl rounded-br-2xl bg-slate-950/85 backdrop-blur-xl border border-white/10">
              <div className="px-7 pt-8 pb-4 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                  Create your account
                </h1>
                <p className="mt-2 text-slate-300">
                  Start your first balanced week today ⚡
                </p>
              </div>

              <div className="px-7 pb-8">
                <Form method="post" className="space-y-5">
                  {/* First name */}
                  <label className="block">
                    <span className="block mb-2 text-sm font-semibold text-slate-200">
                      First name
                    </span>
                    <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 focus-within:border-emerald-400">
                      <FiUser className="text-slate-400 text-lg" />
                      <input
                        name="name"
                        type="text"
                        placeholder="Alex"
                        className="w-full bg-transparent text-slate-100 placeholder-slate-500 outline-none"
                        required
                      />
                    </div>
                  </label>

                  {/* Last name */}
                  <label className="block">
                    <span className="block mb-2 text-sm font-semibold text-slate-200">
                      Last name
                    </span>
                    <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 focus-within:border-emerald-400">
                      <FiUserPlus className="text-slate-400 text-lg" />
                      <input
                        name="lastName"
                        type="text"
                        placeholder="Rivera"
                        className="w-full bg-transparent text-slate-100 placeholder-slate-500 outline-none"
                        required
                      />
                    </div>
                  </label>

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
                        placeholder="Create a strong password"
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

                  {/* CTA */}
                  <button
                    type="submit"
                    className="w-full rounded-xl py-3 font-semibold text-white shadow-lg transition hover:cursor-pointer"
                    style={{
                      background: 'linear-gradient(to right, var(--secondary-color), var(--primary-color))',
                      '--tw-bg-opacity': '1'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.filter = 'brightness(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.filter = 'brightness(1)';
                    }}
                  >
                    Create account
                  </button>
                </Form>

                <div className="mt-6 text-center text-sm text-slate-300">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-sky-400 hover:text-sky-300"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* end right panel */}
        </div>
      </div>
    </div>
  );
}
