import React from 'react';
import Layout from './Layout';
import { Col, Form, Input, Row, message, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const CreatePoll = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      // console.log(values);
      const options = Object.keys(values.options).map((key) => ({
        text: values[key],
        votes: 0,
      }));
      // console.log(options);

      const payload = {
        ...values,
        userId: user._id,
      };
      // console.log(payload);

      const res = await axios.post('/api/v1/user/create-poll', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        message.success(res.data.success);
        navigate('/');
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Create Poll</h1>
      <Form layout="vertical" onFinish={handleFinish}>
        <Row>
          <Col xs={24} md={24} lg={8} className="mx-auto">
            <Form.Item label="Question" name="Question" required rules={[{ required: true }]}>
              <Input type="text" placeholder="Enter the polling question" />
            </Form.Item>

            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Row gutter={8} key={field.key}>
                      <Col flex="auto">
                        <Form.Item
                          label={`Option ${index + 1}`}
                          required
                          rules={[{ required: true, message: 'Option is required' }]}
                          {...field}
                          fieldKey={[field.fieldKey, 'text']}
                          name={[field.name, 'text']}
                        >
                          <Input placeholder={`Enter option ${index + 1}`} type='text'/>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Button type="dashed" onClick={() => remove(field.name)} block>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add Option
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
};

export default CreatePoll;
