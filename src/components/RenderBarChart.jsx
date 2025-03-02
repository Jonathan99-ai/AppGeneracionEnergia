import React from 'react';
  import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  const RenderBarChart = ({ energyByCategoryArray }) => {
    // console.log(energyByCategoryArray); // Debugging line to check the data

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={energyByCategoryArray}
          margin={{
            top: 5, right: 30, left: 0, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Hidraulica" fill="#8884d8" />
          <Bar dataKey="Combustible_fosil" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  export default RenderBarChart;