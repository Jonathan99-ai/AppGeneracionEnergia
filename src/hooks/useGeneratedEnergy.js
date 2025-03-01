import { useEffect, useState } from 'react'
// import generatedEnergy from '../mocks/GeneracionRecurso.json'
// import resourseList from '../mocks/ListadoRecursos.json'
import { getGeneratedEnergy } from '../services/xm_api'
import { useResourceList } from './useResourceList'

export function useEnergyData ({ startDate, endDate, selectedCategories }) {
  const [generatedEnergy, setGeneratedEnergy] = useState()
  const { resourceList } = useResourceList()

  useEffect(() => {
    if (!startDate && !endDate) return
    try {
      getGeneratedEnergy({ startDate, endDate }).then(newData => setGeneratedEnergy(newData))
    } catch (error) {
      console.error('Error fetching energy data:', error)
    }
  }, [startDate, endDate])

  // Ensure resourceList is loaded before processing
  if (!resourceList || !resourceList.Items) {
    return { energyArray: [], energyByCategoryArray: [], energySummary: {} }
  }

  if (!generatedEnergy || !generatedEnergy.Items) {
    return { energyArray: [], energyByCategoryArray: [], energySummary: {} }
  }

  const dailyEnergyByResource = {}

  const energySourceMap = {}
  resourceList.Items.forEach((item) => {
    item.ListEntities.forEach((entity) => {
      const { Code, EnerSource } = entity.Values
      energySourceMap[Code] = EnerSource
    })
  })

  generatedEnergy.Items.forEach((item) => {
    const date = item.Date

    // if the date is not already in [dailyEnergyByResource] initialize the object by date
    if (!dailyEnergyByResource[date]) {
      dailyEnergyByResource[date] = {}
    }

    item.HourlyEntities.forEach((entity) => {
      const resourceCode = entity.Values.code

      if (!dailyEnergyByResource[date][resourceCode]) {
        dailyEnergyByResource[date][resourceCode] = 0
      }
      Object.entries(entity.Values).forEach(([key, value]) => {
        if (key !== 'code' && !isNaN(parseFloat(value)) && value !== '') {
          dailyEnergyByResource[date][resourceCode] += parseFloat(value)
        }
      })
    })
  })

  // convert to an array format suitable for a chart
  const energyArray = Object.entries(dailyEnergyByResource).map(([date, resources]) => {
    const formattedEntry = { date }
    Object.keys(resources).forEach((key) => {
      if (key !== 'date') {
        formattedEntry[key] = parseFloat((resources[key] / 1000000).toFixed(2))
      }
    })
    return formattedEntry
  })

  const energyBySourceArray = energyArray.map((entry) => {
    const newEntry = { date: entry.date }

    Object.entries(entry).forEach(([key, value]) => {
      if (key !== 'date') {
        // Map resource to energy source
        const energySource = energySourceMap[key] || 'Unknown'
        // Aggregate by energy source
        newEntry[energySource] = (newEntry[energySource] || 0) + value
      }
    })

    return newEntry
  })

  const energyCategoryMap = {
    Hidraulica: ['AGUA'],
    Combustible_fosil: ['GAS', 'CARBON', 'COMBUSTOLEO', 'ACPM', 'JET-A1'],
    Solar: ['RAD SOLAR'],
    Biomasa: ['BIOGAS', 'BAGAZO'],
    Eolica: ['VIENTO']
  }

  const energyByCategoryArray = energyBySourceArray.map((entry) => {
    const categorizedEntry = { date: entry.date }

    Object.entries(entry).forEach(([key, value]) => {
      if (key !== 'date') {
        // Find the category for the energy source
        const category = Object.keys(energyCategoryMap).find((cat) =>
          energyCategoryMap[cat].includes(key)
        )

        // Aggregate by category
        categorizedEntry[category] = parseFloat(((categorizedEntry[category] || 0) + value).toFixed(2))
      }
    })

    return categorizedEntry
  })

  // Filter data based on selected categories
  const filteredData = energyByCategoryArray.map((entry) => {
    const filteredEntry = { date: entry.date }
    selectedCategories.forEach((category) => {
      filteredEntry[category] = entry[category] || 0
    })
    return filteredEntry
  })

  const renewableSources = ['Hidraulica', 'Solar', 'Biomasa', 'Eolica']
  const nonRenewableSources = ['Combustible_fosil']

  // Initialize total counters
  let totalEnergy = 0
  let totalRenewableEnergy = 0
  let totalNonRenewableEnergy = 0

  // Loop through all daily entries in energyByCategoryArray
  filteredData.forEach(entry => {
    // Sum total energy per day
    const dayTotal = Object.values(entry)
      .filter(value => typeof value === 'number')
      .reduce((acc, curr) => acc + curr, 0)
    totalEnergy += dayTotal

    // Sum renewable energy per day
    const dayRenewable = Object.entries(entry)
      .filter(([key]) => renewableSources.includes(key))
      .reduce((acc, [, value]) => acc + value, 0)
    totalRenewableEnergy += dayRenewable

    // Sum non-renewable energy per day
    const dayNonRenewable = Object.entries(entry)
      .filter(([key]) => nonRenewableSources.includes(key))
      .reduce((acc, [, value]) => acc + value, 0)
    totalNonRenewableEnergy += dayNonRenewable
  })

  // Final summary object
  const energySummary = {
    totalEnergy: parseFloat(totalEnergy.toFixed(2)),
    renewableEnergy: parseFloat(totalRenewableEnergy.toFixed(2)),
    nonRenewableEnergy: parseFloat(totalNonRenewableEnergy.toFixed(2)),
    renewablePercentage: parseFloat(((totalRenewableEnergy / totalEnergy) * 100).toFixed(2)),
    nonRenewablePercentage: parseFloat(((totalNonRenewableEnergy / totalEnergy) * 100).toFixed(2))
  }

  const primarySources = ['Hidraulica', 'Combustible_fosil']
  const otherSources = ['Solar', 'Biomasa', 'Eolica'] // Adjust based on your data

  // Separate the data into two groups
  const primaryEnergyArray = filteredData.map(entry => ({
    date: entry.date,
    ...Object.fromEntries(
      Object.entries(entry)
        .filter(([key]) => primarySources.includes(key))
    )
  }))

  const otherEnergyArray = filteredData.map(entry => ({
    date: entry.date,
    ...Object.fromEntries(
      Object.entries(entry)
        .filter(([key]) => otherSources.includes(key))
    )
  }))

  return { energyArray, primaryEnergyArray, otherEnergyArray, energySummary }
}
