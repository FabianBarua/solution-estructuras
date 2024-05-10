import { Input, Select, SelectSection, SelectItem } from '@nextui-org/react'
import { SearchIcon } from '@icons/SearchIcon'
import { ALL_PARAMS, ALL_SORTS } from '@/shared/constants'
import { paramsStore } from '@/shared/stores/params'
import '@react/HeaderSearch.css'
import { useEffect } from 'react'
import { useStore } from '@nanostores/react'

export const setSearch = (value) => {
  const prevParams = paramsStore.get()
  const newParams = {
    ...prevParams,
    search: value,
    page: 1
  }
  paramsStore.set(newParams)
}

const useParams = () => {
  const params = useStore(paramsStore)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const searchParameter = searchParams.get(ALL_PARAMS.search) || ''
    const categoryParameter = searchParams.get(ALL_PARAMS.categories) || ''
    const pageParameter = parseInt(searchParams.get(ALL_PARAMS.page)) || 1
    const sortParameter = parseInt(searchParams.get(ALL_PARAMS.sortID)) || 0

    const newParams = {
      search: searchParameter,
      categories: categoryParameter,
      page: parseInt(pageParameter),
      sortID: parseInt(sortParameter)
    }
    console.log(newParams)
    paramsStore.set(newParams)
  }, [])

  useEffect(() => {
    if (params !== null) {
      // set windows params
      const newWindowsParams = new URLSearchParams()
      if (params?.search !== '') {
        newWindowsParams.set(ALL_PARAMS.search, params.search)
      }
      if (params?.categories !== '') {
        newWindowsParams.set(ALL_PARAMS.categories, params.categories)
      }
      if (params?.page !== 1) {
        newWindowsParams.set(ALL_PARAMS.page, params.page)
      }
      if (params?.sortID !== 0) {
        newWindowsParams.set(ALL_PARAMS.sortID, params.sortID)
      }
      window.history.pushState({}, '', '?' + newWindowsParams.toString())
    }
  }, [params])

  return { params }
}

export const HeaderSearch = () => {
  const { params } = useParams()

  const handleSearch = (event) => {
    const value = event.target.value
    setSearch(value)
  }

  const handleChange = (e) => {
    const sortID = e.target.value
    const prevParams = paramsStore.get()
    const newParams = {
      ...prevParams,
      sortID,
      page: 1
    }
    paramsStore.set(newParams)
  }

  return (
    <div className=' flex flex-col sm:flex-row gap-4 mt-12'>
      <Input
        placeholder='Ingrese un texto...'
        radius='full'
        startContent={<SearchIcon />}
        onChange={handleSearch}
        defaultValue={params?.search || ''}
      />
      <Select
        placeholder='Relevancia'
        className=' brand sm:max-w-36  *:text-white  '
        color='primary'
        id='selectItems'
        style={{
          color: 'white'
        }}
        aria-label='Selecciona un orden.'
        onChange={handleChange}
        selectedKeys={params?.sortID || 0}
      >
        <SelectSection className='brand  text-white' color='primary'>
          {ALL_SORTS.map((sort) => (
            <SelectItem key={sort.id}>
              {sort.name}
            </SelectItem>
          )
          )}
        </SelectSection>
      </Select>
    </div>
  )
}
