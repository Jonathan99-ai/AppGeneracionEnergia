import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export const RenderLineChart = ({ energyByCategoryArray }) => {
  
  if (!energyByCategoryArray) return

  const resourceKeys = energyByCategoryArray.length > 0
    ? Object.keys(energyByCategoryArray[0]).filter(key => key !== 'date')
    : []

  return (
    <ResponsiveContainer width="100%" height={300}>
    <LineChart data={energyByCategoryArray} margin={{
            top: 5, right: 30, left: 0, bottom: 5,
          }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='date' />
      <YAxis
        // label={{
        //   value: 'Generación [GWh]',
        //   angle: -90,
        //   position: 'center',
        //   offset: 500,
        //   style: { fill: '#6b7280' }
        // }}
      />
      <Tooltip />
      <Legend />
      {
        resourceKeys.map((resource, index) => (
          <Line
            key={resource}
            type='monotone'
            dataKey={resource}
            stroke={['#8884d8', '#82ca9d', '#ffc658'][index % 3]}
            strokeWidth={2}
          />
        ))
      }
    </LineChart>
    </ResponsiveContainer>
  )
}

export default RenderLineChart
