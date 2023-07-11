import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import '../styles/ResultsStyle.css';

const Results = () => {
  const [pollsData, setPollsData] = useState({});

  useEffect(() => {
    fetchPollData();
  }, []);

  const fetchPollData = async () => {
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

  // Prepare data for the chart
  const chartData = Object.values(pollsData)
    .flatMap((poll) =>
      poll.options.map((option) => ({
        name: option.text,
        value: option.votes,
      }))
    );

  const COLORS = [
    '#8884D8',
    '#FF6492',
    '#FFB100',
    '#0088FE',
    '#00C49F',
    '#FFC0CB',
    
  ];

  const RADIAN = Math.PI / 180;

  const customLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const [vt, setvt] = useState(0);

  return (
    <div>
      <Layout>
        <div className='full-page'>
        <div className='grid-container-element text-center shadow-lg'>
            {Object.values(pollsData).map((poll) => (
            <div key={poll._id}>
                <h2 className='bg-dark fw-bold rounded shadow poll-q p-2'>{poll.Question}</h2>
                <div className='table-container grid-child-element p-3'>
                    <table className='shadow-lg'>
                        <thead className='bg-info'>
                        <tr>
                        <th>Option name</th>
                        <th>Votes</th>
                        <th>Color</th>
                        </tr>
                    </thead>
                    <tbody className='bg-secondary text-light'>
                        {poll.options.map((option, index) => (
                        <tr key={index}>
                            <td>{option.text}</td>
                            <td>{option.votes}</td>
                            <td style={{backgroundColor: COLORS[index]}}>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            ))}
            <div>
            

            <div className='chart-container grid-child-element'>
                <ResponsiveContainer width="90%" height={300}>
                    <PieChart className='rounded shadow'>
                    <Pie 
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        fill="#8884d8"
                        labelLine={false}
                        label = {customLabel}
                        >
                        {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            </div>
        </div>
        </div>
      </Layout>
    </div>
  );
};

export default Results;
