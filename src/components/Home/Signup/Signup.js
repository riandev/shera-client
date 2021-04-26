import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";

const Signup = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [signUpStatus,setSignUpStatus]=useState({});
    const onSubmit = (data) => {
        console.log(data);
        fetch('https://ancient-wildwood-60100.herokuapp.com/signUpUser',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => setSignUpStatus(data))
      };
    return (
        <div className="mt-4">
        <form className="w-50 card m-auto p-4" onSubmit={handleSubmit(onSubmit)}>
          <h3>Sign Up</h3>
  
          <div className="form-group">
            <label>Full Name</label>
            <input
              {...register("name")}
              type="text"
              className="form-control"
              placeholder="Full Name"
            />
          </div>
  
          <div className="form-group">
            <label>Agent ID</label>
            <input {...register("agentid")} type="text" className="form-control" placeholder="Agent Id" />
          </div>
  
          <div className="form-group">
            <label>Email address</label>
            <input
            {...register("email")}
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
  
          <div className="form-group">
            <label>Password</label>
            <input
            {...register("password")}
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <input className="btn btn-primary btn-block" type="submit" />
          <p className="forgot-password text-right">
            Already registered <Link to="/">sign in?</Link>
          </p>
        </form>
        {
            signUpStatus === true && alert('Sign Up Successfully Completed')
        }
      </div>
    );
};

export default Signup;