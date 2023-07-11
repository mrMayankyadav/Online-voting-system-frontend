import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, List, message, Popconfirm } from 'antd';
import Layout from './Layout';
import {useNavigate} from 'react-router-dom';
import '../styles/DeletePollsStyles.css';

const DeletePolls = () => {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get('/api/v1/user/getPolls');
      setPolls(response.data);
    } catch (error) {
      console.log('Error fetching polls:', error);
    }
  };

  const deletePoll = async (pollId) => {
    try {
        console.log(pollId);
      await axios.delete(`/api/v1/user/deletePoll/${pollId}`);
      message.success('Poll deleted successfully');
      fetchPolls();
      navigate('/');
    } catch (error) {
      console.log('Error deleting poll:', error);
    }
  };

  return (
    <div>
        <Layout>
            <div className='delete-page'>
                <div className="delete-container shadow-lg">
                    <h1 className='fw-bold text-center'>Delete Polls</h1>
                    <List
                        dataSource={polls}
                        renderItem={(poll) => (
                        <List.Item>
                            <List.Item.Meta title={poll.Question}  className='m-2 p-1 rounded shadow poll-question bg-info text-center'/>
                            <Popconfirm
                            title="Are you sure you want to delete this poll?"
                            onConfirm={() => deletePoll(poll._id)}
                            okText="Yes"
                            cancelText="No"
                            >
                            <Button type="primary" danger className=' text-center shadow'>
                                Delete
                            </Button>
                            </Popconfirm>
                        </List.Item>
                        )}
                    />
                </div>
            </div>
        </Layout>
    </div>
  );
};

export default DeletePolls;
