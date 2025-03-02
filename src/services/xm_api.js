//const XM_API_ENDPOINT_LISTS = 'https://servapibi.xm.com.co/lists'
//const XM_API_ENDPOINT_HOURLY = 'POST: https://servapibi.xm.com.co/hourly'

const XM_API_ENDPOINT_LISTS = '/api/lists'
const XM_API_ENDPOINT_HOURLY = '/api/hourly'

const requestDataResource = {
  MetricId: 'ListadoRecursos'
}

const requestDataGenEnergy = {
  MetricId: 'Gene',
  StartDate: '2024-01-01',
  EndDate: '2024-01-30',
  Entity: 'Recurso',
  Filter: []
}

export const getResourceList = async () => {
  const res = await fetch(XM_API_ENDPOINT_LISTS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Set the content type for JSON data
    },
    body: JSON.stringify(requestDataResource) // Convert JavaScript object to JSON string
  })
  const resourceList = await res.json()
  return resourceList
}

export const getGeneratedEnergy = async ({ startDate, endDate }) => {
  if (startDate && endDate) {
    requestDataGenEnergy.StartDate = startDate
    requestDataGenEnergy.EndDate = endDate
  }

  const res = await fetch(XM_API_ENDPOINT_HOURLY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Set the content type for JSON data
    },
    body: JSON.stringify(requestDataGenEnergy) // Convert JavaScript object to JSON string
  })
  const generatedEnergy = await res.json()
  return generatedEnergy
}
