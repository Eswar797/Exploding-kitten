import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Register, setIsAuthenticated } from "../context/Slices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const submitHandler = async (e) => {
    e.preventDefault();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.length === 0 || email.length === 0 || password.length === 0) {
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
        Register(name, email, password, navigate);
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
      <div className="xl:h-4/5 w-full flex items-end justify-center relative">
        <form className="flex justify-center items-center flex-col gap-5 gap-y-8 py-10 px-12 rounded-lg bg-neutral-900 relative z-[999]">
          <h1 className=" sm:text-[2vw] xl:text-[1.5vw] font-semibold gameOverText">
            Sign Up Here
          </h1>
          <Input
            
            data={name}
            type="text"
            change={setName}
            pHold="enter your name"
          />
          <Input
            
            data={email}
            type="email"
            change={setEmail}
            pHold=" email"
          />
          <Input
            
            data={password}
            type="password"
            change={setPassword}
            pHold="password"
          />
          <button
            onClick={(e) => {
              submitHandler(e);
            }}
            className="bg-white text-neutral-700 py-2 px-4   xl:text-[1.5vw] 2xl:text-[1.3vw] font-medium rounded-lg shadow-lg shadow-gray-600"
          >
            Create an account
          </button>
          <span>
            Already have an account ?{" "}
            <Link className=" underline" to="/login">
              Log in
            </Link>
          </span>
        </form>
        <h1 className="text-[9vw] opacity-10 gameOverText font-semibold absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[30%]">
          Exploding Kitten 😼
        </h1>
      </div>
    </div>
  );
}

export default SignUp;
