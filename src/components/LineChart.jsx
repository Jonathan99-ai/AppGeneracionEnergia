import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export const RenderLineChart = ({ energyByCategoryArray }) => {
  if (!energyByCategoryArray) return

  const resourceKeys = energyByCategoryArray.length > 0
    ? Object.keys(energyByCategoryArray[0]).filter(key => key !== 'date')
    : []

  return (
    // <ResponsiveContainer>
    <LineChart width={1000} height={300} data={energyByCategoryArray}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='date' />
      <YAxis
        label={{
          // value: 'Generación [GWh]',
          angle: -90,
          position: 'center',
          offset: 20,
          style: { fill: '#6b7280' }
        }}
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
    // </ResponsiveContainer>
  )
}

export default RenderLineChart
