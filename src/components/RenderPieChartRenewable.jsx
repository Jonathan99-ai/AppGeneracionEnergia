import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RenderPieChartRenewable = ({ energyByCategoryArray }) => {
  if (!Array.isArray(energyByCategoryArray) || energyByCategoryArray.length === 0) {
    return <p>No data available</p>;
  }

  const aggregatedData = energyByCategoryArray.reduce((acc, item) => {
    acc.Hidraulica += item.Hidraulica || 0;
    acc.Combustible_fosil += item.Combustible_fosil || 0;
    return acc;
  }, { Hidraulica: 0, Combustible_fosil: 0 });

  const pieData = [
    { name: 'Hidraulica', value: aggregatedData.Hidraulica },
    { name: 'Combustible_fosil', value: aggregatedData.Combustible_fosil },
  ];

  const COLORS = ['#8884d8', '#82ca9d'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RenderPieChartRenewable;