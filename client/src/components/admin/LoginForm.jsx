import React, { useState } from "react";
import useAuthStore from "../../stores/admin/authStore";
import axios from "axios";

const LoginForm = () => {
  const { username, password, setUsername, setPassword } = useAuthStore();
  const [negativeLabel, setNegativeLabel] = useState(false);
  const [positiveLabel, setPositiveLabel] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // Authentication logic here

    axios.post("")
    .then(response => {
      setPositiveLabel(true)
    })
    .catch(error => {
      setNegativeLabel(true)
    });
  
  };

  return (
    <div className="mobileSB h-screen bgALogin flex justify-center items-center">
      <div
        className="mobileS0 w-3/5 h-auto py-14 rounded-xl shadow-2xl 
      bg-slate-300 bg-opacity-10 flex justify-around items-start overflow-auto"
      >
        <div className="mobileS1 flex flex-col w-1/3">
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
            {negativeLabel && <label className="text-sm text-red-600 ">Wrong Username Or Password</label>}
            {positiveLabel && <label className="text-sm text-green-600 ">Login Successful!</label>}
            <label required className="mb-2 text-sm font-semibold" htmlFor="username">
              Username:
            </label>
            <input
              className="mb-6 p-4 text-sm rounded-md h-12 outline-none focus:border-2 focus:border-slate-950 "
              placeholder="Enter your username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label required className="mb-2 text-sm font-semibold" htmlFor="password">
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
        <div className="text-white w-1/3 self-center
        mobileS2">
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
