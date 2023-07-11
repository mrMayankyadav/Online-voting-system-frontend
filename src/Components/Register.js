import React from "react";
import '../styles/RegisterStyle.css';
import {Form, Input, message} from 'antd';
import axios from 'axios';
import{Link, useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";


export function Register()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formHandler = async(values) =>{
        try{
          dispatch(showLoading());
          const res = await axios.post('/api/v1/user/register', values);
          dispatch(hideLoading());
          //check if values are passes successfully or not
          if(res.data.success){
            message.success('Registration successful');
            //if registration successful, then navigate to login page
            navigate('/login');
          }
          else{
            message.error(res.data.message);
          }
        }
        catch(error)
        {
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
                <h3 className="text-center">Registration From</h3>
                <Form.Item label="Name" name="name">
                  <Input type="text" required />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                  <Input type="password" required />
                </Form.Item>
                <Link to="/login" className="m-2">
                  Already a user? Login here
                </Link>
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </Form>
            </div>
            </div>
        </div>
      );
};