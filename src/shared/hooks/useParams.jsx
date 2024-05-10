import { useEffect, useState } from 'react'
import { ALL_PARAMS } from '@/shared/constants'
import { getParamsV2 } from '@/shared/services/estructuras'

export const useParams = ({ searchDebounced }) => {
  const [params, setParams] = useState()

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search)

    if (params.search === '') {
      currentParams.delete(ALL_PARAMS.search)
    } else if (params.search) {
      currentParams.set(ALL_PARAMS.search, params.search)
    }

    if (params.sortID === 0) {
      currentParams.delete(ALL_PARAMS.sortID)
    } else if (params.sortID) {
      currentParams.set(ALL_PARAMS.sortID, params.sortID)
    }

    if (params.categories === '') {
      currentParams.delete(ALL_PARAMS.categories)
    } else if (params.categories) {
      currentParams.set(ALL_PARAMS.categories, params.categories)
    }

    if (params.page === 1) {
      currentParams.delete(ALL_PARAMS.page)
    } else if (params.page > 1) {
      currentParams.set(ALL_PARAMS.page, params.page)
    }

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`

    if (window.location.search !== currentParams.toString()) {
      window.history.pushState({}, '', newUrl)
    }

    searchDebounced()
  }, [params])

  return {
    params, setParams, setSort, setSearch, setCategories, setPage
  }
}
