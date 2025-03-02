import React from 'react';
  import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  const RenderBarChartRenewable = ({ energyByCategoryArray }) => {

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
          <Bar dataKey="Solar" fill="#8884d8" />
          <Bar dataKey="Biomasa" fill="#82ca9d" />
          <Bar dataKey="Eolica" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  export default RenderBarChartRenewable;