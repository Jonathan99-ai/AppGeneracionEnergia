import { useState } from 'react'

const energyCategories = ['Hidraulica', 'Combustible_fosil', 'Solar', 'Biomasa', 'Eolica']

function EnergyFilter({ onSelectCategories, initSelectedCategories }) {
  const [selectedCategories, setSelectedCategories] = useState(initSelectedCategories)

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevSelected) => {
      const newSelection = prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]

      if (typeof onSelectCategories === 'function') {
        setTimeout(() => onSelectCategories(newSelection), 0) // ✅ Ensure it's a function before calling
      }
      return newSelection
    })
  }

  return (
    <div>
      <div>
        {energyCategories.map((category) => (
          <label key={category}>
            <input
              type='checkbox'
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange(category)}
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  )
}

export default EnergyFilter
