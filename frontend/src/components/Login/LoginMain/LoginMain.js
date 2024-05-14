import "./LoginMain.css";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { toast } from "react-hot-toast";
import { AuthContext, useAuth } from "../../../security/AuthContext";

export default function LoginMain() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const authContext = useAuth();

  function onSubmit() {
    authContext.login(formData.username, formData.password);
    
  } 

  const onLogin = async ({ username, password }) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // const jwtToken = response.headers.get("Authorization");
        const data = await response.json(); // Parse the JSON data from the response
        console.log(data); // Log the data to the console
        const jwtToken = data.token;
        console.log(jwtToken);
        console.log("Login successful");

        // Store JWT token in local storage or session storage
        localStorage.setItem("jwtToken", jwtToken);
        // Redirect to dashboard or any other protected route
        // window.location.href = "/dashboard";
        toast.success("Login Successful!");
      } else {
        // Handle login error
        // toast.error("Login failed \n Wrong Credentials used!");
        toast.error(
          <div className="flex flex-col justify-center items-center px-11">
            <p className="font-semibold">Login Failed</p> Wrong Credentials
            used!
          </div>
        );
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <section className="about" id="about">
        <div className="section__container about__container">
          <div className="about__grid">
            <div className="about__content">
              <h2 className="section__header">
                Your Gateway to Streamlined Management
              </h2>
              <p className="para">
                At Concord, we believe in making organizational management as
                straightforward as possible. Whether you're a seasoned
                professional or just starting your managerial journey, our
                platform is designed to empower you. Log in or register now to
                unlock a world of possibilities for your business.
              </p>
              <br />
            </div>
            <div className="about__list">
              <div className="login-wrap">
                <div className="login-wrap-box">
                  <div className="login-title">
                    <h3>Enter User Details</h3>
                  </div>
                  <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                  >
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Username!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            username: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item className="not-regis">
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        noStyle
                      >
                        <Checkbox style={{ color: "white" }}>
                          {" "}
                          Remember me
                        </Checkbox>
                      </Form.Item>

                      <a className="login-form-forgot" href="">
                        Forgot password
                      </a>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        // onClick={() => onLogin(formData)}
                        onClick={() => onSubmit()}
                      >
                        Log in
                      </Button>
                    </Form.Item>
                  </Form>
                  <p className="not-regis">
                    Not registered? <a href="signup.html">Create account</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}