import React from "react";
import '../styles/RegisterStyle.css';
import {Form, Input, message} from 'antd';
import{Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {showLoading, hideLoading} from "../redux/features/alertSlice";

export function Login()
{
  const navigate = useNavigate();
  const dispatch = useDispatch();

    //form handler
    const formHandler = async(values) =>{
      try{
        dispatch(showLoading());
        const res = await axios.post('/api/v1/user/login', values);
        dispatch(hideLoading());
        if(res.data.success)
        {
          localStorage.setItem("token", res.data.token);
          message.success('Login successfull!');
          navigate('/');
          window.location.reload();
        }
        else{
          message.error("Invalid username or password");
        }
      }
      catch(error){
        dispatch(hideLoading());
        console.log(error);
        message.error('Something went wrong');
      }
        
    };
    return (
      <div className="base">
        <div className='log-reg-body shadow-lg'>
          <h1 className="fw-bold text-warning p-3 bg-dark rounded m-5 shadow">Online Polling App</h1>
          <div className="form-container shadow">
            <Form layout="vertical" onFinish={formHandler} className="register-form">
              <h3 className="text-center">Login From</h3>
            
              <Form.Item label="Email" name="email">
                <Input type="email" required />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" required />
              </Form.Item>
              <Link to="/register" className="m-2">
                New here? Register yourself
              </Link>
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </Form>
          </div>
        </div>
        </div>
      );
};