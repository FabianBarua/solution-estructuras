import { atom } from 'nanostores'

export const paramsStore = atom(null)

// export const setAllParams = ({ newParams }) => {
//   paramsStore.set(newParams)
// }

// export const setSortId = (sort) => {
//   const prevParams = paramsStore.get()
//   const newParams = {
//     ...prevParams,
//     sortID: sort.id
//   }

//   paramsStore.set(newParams)
// }

// export const setCategories = ({ categories, newPage }) => {
//   const prevParams = paramsStore.get()
//   const newParams = {
//     ...prevParams,
//     categories,
//     page: newPage || 1
//   }
//   paramsStore.set(newParams)
// }

// export const setPage = (page) => {
//   const prevParams = paramsStore.get()
//   const newParams = {
//     ...prevParams,
//     page
//   }
//   paramsStore.set(newParams)

//   window.scrollTo({ top: 0, behavior: 'smooth' })
// }

// export const handleSearch = (event) => {
//   const value = event.target.value
//   setSearch(value)
// }
