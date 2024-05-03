import React, { useState } from "react";
import { authBg, Logo } from "../assets";
import { Input } from "../components";

import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../assets/animations";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signInWithGoogle = async () => {};

  const signUpWithEmailPassword = async () => {};

  const signInWithEmailPassword = async () => {};

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      <img
        src={authBg}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt="authBackground"
      />

      <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="Logo" />
          <p className="text-headingColor font-semibold text-2xl">
            Quick Eats App
          </p>
        </div>

        <p className="text-3xl font-semibold text-headingColor">Welcome Back</p>
        <p className="text-xl text-textColor -mt-6">
          {isSignUp ? "Sign Up" : "Sign In"} with following
        </p>

        <div className=" w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <Input
            placeHolder={"Email Here"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            value={email}
            handleOnChange={setEmail}
            type="email"
          />

          <Input
            placeHolder={"Password Here"}
            icon={<FaLock className="text-xl text-textColor" />}
            value={password}
            handleOnChange={setPassword}
            type="password"
          />

          {isSignUp && (
            <Input
              placeHolder={"Confirm Password Here"}
              icon={<FaLock className="text-xl text-textColor" />}
              value={confirmPassword}
              handleOnChange={setConfirmPassword}
              type="password"
            />
          )}

          {!isSignUp ? (
            <p>
              Doesn't have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(true)}
              >
                Create one
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(false)}
              >
                Sign-in here
              </motion.button>
            </p>
          )}

          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signUpWithEmailPassword}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={signInWithEmailPassword}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Sign in
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
          onClick={signInWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">
            Sign In with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
