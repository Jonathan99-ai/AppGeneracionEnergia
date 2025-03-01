import './App.css'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import RenderLineChart from './components/LineChart.jsx'
import GenerationSummary from './components/GenerationSummary.jsx'
import { useEnergyData } from './hooks/useGeneratedEnergy'
import LoginButton from './components/LoginButton.jsx'
import LogoutButton from './components/LogoutButton.jsx'
import EnergyFilter from './components/EnergyFilter.jsx'

function App() {
  const { user, isAuthenticated } = useAuth0()
  const [startDate, setStartDate] = useState('2024-01-01')
  const [endDate, setEndDate] = useState('2024-01-30')
  const [selectedCategories, setSelectedCategories] = useState(['Hidraulica', 'Combustible_fosil', 'Solar', 'Biomasa', 'Eolica'])
  const { energySummary, primaryEnergyArray, otherEnergyArray } = useEnergyData({ startDate, endDate, selectedCategories })

  // Function to update selected categories
  const handleSelectCategories = (categories) => {
    setSelectedCategories(categories)
  }

  return (
    <>
      <h1>Generacion Real del SIN</h1>
      <p>Se presenta la evolución de la generación real del Sistema Interconectado Nacional (SIN) por tipo de fuente y tipo de despacho. Además, el seguimiento a la participación de la generación por planta y renovabilidad.</p>
      {!isAuthenticated
        ? (
          <div>
            <LoginButton />
          </div>
        )
        : (
          <div>
            <LogoutButton />
          </div>
        )}
      <h3>No seleccionar rangos de mas de 30 dias</h3>
      <div className='filters-container'>
        <label htmlFor='start-date'>Fecha Inicio: </label>
        <input type='date' value={startDate} onChange={e => setStartDate(e.target.value)} disabled={!isAuthenticated} />
        <label htmlFor='End-date'>Fecha Fin: </label>
        <input type='date' value={endDate} onChange={e => setEndDate(e.target.value)} disabled={!isAuthenticated} />
      </div>
      <div>
        <EnergyFilter onSelectCategories={handleSelectCategories} initSelectedCategories={selectedCategories} />
      </div>
      <div>
        <GenerationSummary renewable={energySummary.renewablePercentage} nonRenewable={energySummary.nonRenewablePercentage} total={energySummary.totalEnergy} />
      </div>
      <div className='chart-container'>
        <RenderLineChart energyByCategoryArray={primaryEnergyArray} />
      </div>
      <div className='chart-container'>
        <RenderLineChart energyByCategoryArray={otherEnergyArray} />
      </div>
    </>
  )
}

export default App
