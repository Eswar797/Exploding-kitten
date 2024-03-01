import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Login, setIsAuthenticated } from "../context/Slices";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const submitHandler = async (e) => {
    e.preventDefault();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length === 0 || password.length === 0) {
      return toast.error("Required Fields not Found", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      if (password.length <= 5) {
        return toast.error("Password length should be More Than 5", {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (!pattern.test(email)) {
        return toast.error("Invalid E-mail Format", {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        Login(email, password, dispatch, navigate);
      }
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(setIsAuthenticated(true));
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="h-2/4 w-full flex justify-center items-end">
        <form className="flex justify-center items-center flex-col gap-5 gap-y-10 py-10 px-12 rounded-lg bg-neutral-900 relative z-[999] ">
          <h1 className="text-[1.5vw] font-semibold gameOverText">
            Let's Play
          </h1>
          <Input
            height="3rem"
            width="20vw"
            data={email}
            type="email"
            change={setEmail}
            pHold=" email"
          />
          <Input
            height="3rem"
            width="20vw"
            data={password}
            type="password"
            change={setPassword}
            pHold="password"
          />
          <button
            onClick={(e) => {
              submitHandler(e);
            }}
            className="bg-white text-neutral-700 py-1 px-4 text-[1.3vw] font-medium rounded-lg shadow-lg shadow-gray-600"
          >
            Get in
          </button>
          <span>
            Don't have an Acoount ?{" "}
            <Link className=" underline" to="/signup">
              Sign Up
            </Link>
          </span>
        </form>
        <h1 className="text-[9vw] opacity-10 gameOverText font-semibold absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
          Exploding Kitten 😼
        </h1>
      </div>
    </div>
  );
}

export default LoginScreen;
