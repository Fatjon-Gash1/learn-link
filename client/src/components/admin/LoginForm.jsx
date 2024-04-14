import React from "react";
import useAuthStore from "../../stores/admin/authStore";

const LoginForm = () => {
  const { email, password, setEmail, setPassword } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Authentication logic here
  };

  return (
    <div className="h-screen bgALogin flex justify-center items-center">
      <div
        className="w-3/5 h-3/5 py-14 rounded-xl shadow-2xl 
      bg-slate-300 bg-opacity-30 flex justify-around items-start overflow-auto"
      >
        <div className="flex flex-col w-1/3">
          <img
            className="self-center w-28 h-28 mb-10 shadow-xl rounded-2xl"
            src="https://placehold.co/112x112"
            alt="logo"
          />

          <form
            className="flex flex-col bg-transparent text-slate-500"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-6 self-center text-slate-900 font-semibold text-xl">
              Login to dashboard
            </h1>
            <label className="mb-2 text-sm font-semibold" htmlFor="email">
              Email:
            </label>
            <input
              className="mb-6 p-4 text-sm rounded-md h-12 outline-none focus:border-2 focus:border-slate-950 "
              placeholder="Enter your email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="mb-2 text-sm font-semibold" htmlFor="password">
              Password:
            </label>
            <input
              className="mb-7 p-4 text-sm rounded-md h-12 outline-none focus:border-2 focus:border-slate-950 "
              placeholder="Enter your password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex">
              <input
                className="mr-2 mb-7 w-5 h-5"
                type="checkbox"
                id="remember"
                name="remember"
                value={"remember"}
              ></input>
              <label
                className="text-sm font-semibold text-slate-900"
                htmlFor="remember"
              >
                Remember me
              </label>
            </div>
            <button
              className="p-4 text-white text-sm font-bold bg-blue-500 hover:bg-blue-700 rounded-lg"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
        <div className="text-white w-1/3 self-center">
          <h1 className="font-bold text-4xl">Take control of the system</h1>
          <hr className="my-4" />
          <p className="text-right">
            <i>Utilize the administrator tools!</i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
