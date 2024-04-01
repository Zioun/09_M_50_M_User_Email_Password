import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import auth from "../Firebase/Firebase.config";
import { Link } from "react-router-dom";
import {sendPasswordResetEmail } from "firebase/auth";


const SignIn = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handelSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    seterrorMessage("");
    setSuccessMessage("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if(result.user.emailVerified){
          setSuccessMessage("Successfully Sign In");
        }else{
          alert("Pleace Verified Your Email")
        }
      })
      .catch((error) => {
        seterrorMessage(error.message);
      });
  };

  const emailRef = useRef(null) 
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if(!email){
      alert("Pleace provide an Email.");
      return;
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      alert("Pleace provide an valid Email.")
      return;
    }
    sendPasswordResetEmail(auth, email)
    .then((result)=>{
      alert("Check Your Email We send a code");
    })
    .catch((error)=>{
      alert(error.message);
    })
  }

  return (
    <div>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign In now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            {successMessage && (
              <p className="text-center py-2 text-green-600">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-center py-2 text-red-600">{errorMessage}</p>
            )}
            <form className="card-body" onSubmit={handelSignIn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  ref={emailRef}
                  className="input input-bordered"
                  name="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign In</button>
              </div>
            </form>
            <p className="text-center pb-3">New to this website please <span className="text-green-600 font-bold"><Link to="/signUp">Sign Up</Link></span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
