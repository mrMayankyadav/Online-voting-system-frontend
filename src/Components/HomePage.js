import React, { useEffect } from "react";
import axios from 'axios';
import Layout from './Layout';
import '../styles/HomeStyles.css';
import votingImage from './voting.jpg';

export function HomePage() {
    //login user data
    const getUserData = async() => {
        try {
            const res = await axios.post(
                "api/v1/user/getUserData", 
                {},
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);
    
    return (
        <div>
            <Layout>
                <div className="text-center p-5">
                    <h1 className="fw-bold text-warning">Online Polling App</h1>
                    <div className="logo-box-container d-flex justify-content-center p-3">
                        <div className="logo-box shadow-lg">
                            <img src={votingImage} alt="Voting" className="logo shadow-lg"/>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}
