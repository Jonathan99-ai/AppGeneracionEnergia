import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RenderPieChartOtherSources = ({ energyByCategoryArray }) => {

  if (!Array.isArray(energyByCategoryArray) || energyByCategoryArray.length === 0) {
    return <p>No data available</p>;
  }

  const aggregatedData = energyByCategoryArray.reduce((acc, item) => {
    acc.Solar += item.Solar || 0;
    acc.Biomasa += item.Biomasa || 0;
    acc.Eolica += item.Eolica || 0;
    return acc;
  }, { Solar: 0, Biomasa: 0, Eolica: 0 });

  const pieData = [
    { name: 'Solar', value: aggregatedData.Solar },
    { name: 'Biomasa', value: aggregatedData.Biomasa },
    { name: 'Eolica', value: aggregatedData.Eolica },
  ];

  const COLORS = ['#ffc658', '#82ca9d', '#8884d8'];

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

export default RenderPieChartOtherSources;
