import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import auth from "../Firebase/Firebase.config";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const SignUp = () => {
    const [errorMessage, seterrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handelSignUp = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkbox = e.target.terms.checked;
        console.log(checkbox);
        seterrorMessage("");
        setSuccessMessage("");
        if(password.length < 6){
            seterrorMessage("Password Should Be at least 6 characters of longer");
            return
        }else if(!/[A-Z]/.test(password)){
            seterrorMessage("Your Password should have at least one upper case characters");
            return;
        }else if(!checkbox){
            seterrorMessage("Pleace Check CheckBox");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((result)=>{
            console.log(result)
            setSuccessMessage("User Created Successfully");
        })
        .catch((error)=>{
            console.log(error)
            seterrorMessage(error.message);
        })
    }
  return (
    <div>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up Now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            {successMessage && <p className="text-center py-2 text-green-600">{successMessage}</p>}
            {errorMessage && <p className="text-center py-2 text-red-600">{errorMessage}</p>}
            <form className="card-body" onSubmit={handelSignUp}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex items-center gap-5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <span onClick={()=>setShowPassword(!showPassword)}>
                    {
                        showPassword ? <FaEyeSlash /> : <IoEyeSharp />
                    }
                </span>
                </div>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="flex gap-5">
                <input type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms">Accept our <a href="">Terms and conditions</a></label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
