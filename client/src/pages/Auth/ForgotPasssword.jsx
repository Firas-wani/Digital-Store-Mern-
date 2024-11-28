
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Forgot Password - E-commerce App">
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <div className="card shadow-lg w-50 p-4">
          <h4 className="text-center mb-4">Reset Your Password</h4>
          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email"
                required
              />
            </div>
            {/* Answer input */}
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputAnswer"
                placeholder="Enter Your Favorite Sport"
                required
              />
            </div>
            {/* New Password input */}
            <div className="mb-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your New Password"
                required
              />
            </div>
            {/* Submit button */}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
