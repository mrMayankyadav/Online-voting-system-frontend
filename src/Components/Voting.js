import React, { useEffect, useState } from 'react';
import { Radio, Space, message } from 'antd';
import Layout from './Layout';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../styles/PollboxStyles.css';

const Voting = () => {
  const [pollsData, setPollsData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  

  const callPollsPage = async () => {
    try {
      const res = await axios.get("/api/v1/user/getPolls");
      setPollsData(res.data);

      if (res.status !== 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callPollsPage();
  }, []);

  const onChange = (e, pollId) => {
    setSelectedOption(e.target.value);
    castVote(pollId, e.target.value);
  };

  const castVote = async (pollId, selectedOption) => {
    try {
      const res = await axios.post(
        '/api/v1/user/castVote',
        {
          pollId,
          selectedOption,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      

      if (res.status === 200) {
        console.log('Vote cast successfully');
        updateUserPolls(pollId);
        message.success("Vote casted successfully!");
        callPollsPage();
      } 
      else if(res.status === 201){
        message.success("User has already voted!");
        navigate('/');
      }else {
        console.log('Failed to cast vote');
      }
    } catch (error) {
      console.log('Error casting vote', error);
    }
  };


  const updateUserPolls = async (pollId) => {
    try {
      const res = await axios.post(
        '/api/v1/user/updateUserPolls',
        {
          pollId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (res.status === 200) {
        console.log('User voted poll updated successfully');
        navigate('/');
      } else {
        console.log('Failed to update user voted poll');
      }
    } catch (error) {
      console.log('Error updating user voted poll', error);
    }
  };

  return (
    <div>
      <Layout>
        <div className='parent-container p-5'>
          <div className='poll-box mx-auto shadow-lg'>
            {Object.values(pollsData).map((poll) => (
              <div key={poll._id}>
                <h2>{poll.Question}</h2>
                <Radio.Group
                  onChange={(e) => onChange(e, poll._id)}
                  value={selectedOption}
                >
                  <Space direction='vertical'>
                    {poll.options.map((option, index) => (
                      <Radio value={index} key={index}>
                        <h3>{option.text}</h3>
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Voting;

