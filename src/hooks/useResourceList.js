import { useEffect, useState } from 'react'
import { getResourceList } from '../services/xm_api'

export function useResourceList () {
  const [resourceList, setResourceList] = useState()

  const refreshResourceList = () => {
    getResourceList().then(newResourceList => setResourceList(newResourceList))
  }

  // get the list on first load of the page
  useEffect(refreshResourceList, [])

  return { resourceList, refreshResourceList }
}
