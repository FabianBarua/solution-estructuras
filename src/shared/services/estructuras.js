import { ALL_PARAMS } from '../constants'

export const getCategories = async ({ limit }) => {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set('limit', limit)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  }

  const response = await fetch('/api/products/categories?' + searchParams.toString(), options)

  const data = await response.json()

  return data
}

export const searchProducts = async ({ search, category, page, sort }) => {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(ALL_PARAMS.search, search)
  searchParams.set(ALL_PARAMS.categories, category)
  searchParams.set(ALL_PARAMS.page, page)
  searchParams.set(ALL_PARAMS.sortID, sort)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  }

  const response = await fetch('/api/products?' + searchParams.toString(), options)

  const data = await response.json()

  return data
}

export const getParams = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const searchParameter = searchParams.get(ALL_PARAMS.search) || null
  const categoryParameter = searchParams.get(ALL_PARAMS.categories) || null
  const pageParameter = searchParams.get(ALL_PARAMS.page) || null
  const allInUrl = searchParams.toString()
  console.log(allInUrl)
  return { searchParameter, categoryParameter, pageParameter, allInUrl }
}